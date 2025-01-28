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

export const POST = async (request: NextRequest) => {
  try {
    // File uploading process
    const form = await request.formData();
    const file = form.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No File Uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    // Extract text from PDF
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();

    const extractedText = docs.map((doc) => doc.pageContent).join("\n");

    // Make chunks of the extracted text
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 786,
      chunkOverlap: 76,
    });
    const output = await splitter.createDocuments([extractedText]);

    const chunks = output.map((chunk) => chunk.pageContent.replace(/\n/g, " "));

    // Create embeddings of the chunks through OpenAI
    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY!,
    });
    const vectors = await embeddings.embedDocuments(chunks);

    // Upload vectors to Pinecone
    await uploadChunkToPineCone(chunks, vectors, filePath, file.name);

    return NextResponse.json(
      { message: "Upload and processing successful" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

const uploadChunkToPineCone = async (
  chunks: string[],
  embeddings: number[][],
  url: string,
  fileName: string
): Promise<void> => {
  const batchSize = 100;
  let batch: {
    id: string;
    values: number[];
    metadata: Record<string, string>;
  }[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const metadata = {
      fileName,
      url,
      text: chunk,
      id: uuid(),
    };

    batch.push({ id: uuid(), values: embeddings[i], metadata });

    if (batch.length === batchSize || i === chunks.length - 1) {
      await pineConeIndex.upsert(batch);
      batch = [];
    }
  }
};
