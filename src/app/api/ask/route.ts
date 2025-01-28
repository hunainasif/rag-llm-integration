import { NextRequest, NextResponse } from "next/server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Index, Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";

export const POST = async (request: NextRequest) => {
  try {
    const pineCone = new PineconeClient({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    const pineConeIndex: Index = pineCone.Index(process.env.PINECONE_INDEX!);

    // Parse the request body
    const reqBody = await request.json();
    const { messages }: { messages: string } = reqBody;

    // Create embeddings for the prompt
    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const vectors = await embeddings.embedQuery(messages);
    console.log(vectors);

    // Query the vector database
    const queryResponse = await pineConeIndex.query({
      vector: vectors,
      topK: 5,
      includeMetadata: true,
    });

    // Format text from vector database response
    const formattedText = queryResponse?.matches
      .map((doc) => doc?.metadata?.text)
      .join("\n");

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Treat like you're the agent of a developer. You need to go through the complete CV and focus on all sections, especially skills, projects, and others:\n\n${formattedText}`,
        },
      ],
    });

    // Directly use the response content
    const responseContent = chatResponse?.choices[0]?.message?.content;
    console.log(responseContent);

    return NextResponse.json({ content: responseContent }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
