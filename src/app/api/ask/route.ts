import { NextRequest, NextResponse } from "next/server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Index, Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";

export const POST = async (request: NextRequest, response: NextRequest) => {
  try {
    const pineCone = new PineconeClient({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    const pineConeIndex: Index = pineCone.Index(process.env.PINECONE_INDEX!);

    // take prompt
    const reqBody = await request.json();
    const { messages } = reqBody;
    // make embeddings of the prompt
    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const vectors = await embeddings.embedQuery(messages);
    console.log(vectors);
    //   query the vector Database
    const queryResponse = await pineConeIndex.query({
      vector: vectors,
      topK: 5,
      includeMetadata: true,
    });
    //   got response from vector data base
    const formattedtext = queryResponse?.matches
      .map((doc) => doc?.metadata?.text)
      .join("\n");
    //  initialize OpenAi

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Treat Like Your are the agent of a developer You have to gothrough the complete CV and make strong grip on all the sections specially skiils section project and others :\n\n${formattedtext}`,
        },
      ],
    });
    let response = chatResponse?.choices[0].message;
    console.log(chatResponse?.choices[0].message?.content);
    return NextResponse.json({ response }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
