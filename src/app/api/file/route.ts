import { mkdir, writeFile } from "fs/promises";
import { NextResponse, NextRequest } from "next/server";
import path from "path";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Index, Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { v4 as uuid } from "uuid";
const pineCone = new PineconeClient({ apiKey: process.env.PINECONE_API_KEY! });
const pineConeIndex: Index = pineCone.Index(process.env.PINECONE_INDEX!);
export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    // file Uploading process
    let form = await request.formData();
    let file = form.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No File Uploaded" }, { status: 500 });
    }

    const arrayBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const uploadDir = path.join(process.cwd(), "public/uploads");

    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);

    await writeFile(filePath, buffer);
    //   extract text from pdf
    const loader = new PDFLoader(filePath);

    const docs = await loader.load();

    const extractedText = docs.map((doc: any) => doc.pageContent).join("/n");

    // make chunks of the extracted text
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 786,
      chunkOverlap: 76,
    });

    const output = await splitter.createDocuments([extractedText]);

    const chunks = output.map((chunk: any) =>
      chunk.pageContent.replace(/\n/g, " ")
    );

    // create embeddings of the chunks through OPENAI

    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const vectors = await embeddings.embedDocuments(chunks);

    //upload vectors to the pineCone Cloud vetor dataBase
    await uploadChunkToPineCone(chunks, vectors, filePath, file.name);

    return NextResponse.json({ hey: "Storm" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.messsage }, { status: 500 });
  }
};

const uploadChunkToPineCone = async (chunks, embeddings, url, fileName) => {
  let batchSize = 100;
  let batch: any[] = [];
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const metadata = {
      fileName: fileName,
      url: url,
      text: chunk,
      id: uuid(),
    };
    batch.push({ id: uuid(), values: embeddings[i], metadata });
    if (batchSize === batch.length || i === chunks.length - 1) {
      await pineConeIndex.upsert(batch);
      batch.length = 0;
    }
  }
};
