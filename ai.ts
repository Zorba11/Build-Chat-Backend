import OpenAI from "openai";

require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// CommandParser
export const parseCommand = async (command: string) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an AI assistant helping a developer modify a Next.js application 
          based on textual commands.Based on the user's ask. You should generate steps to find out
          what files of the next js application has to be changed and how to change that. For this you should be
          querying a knowledge graph which have a component map of the next js application. You
          should generate the query that can be used to fetch these necessary information.
           `,
        },
        { role: "user", content: command },
      ],
      model: "gpt-3.5-turbo",
    });

    return response.choices[0];
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return null;
  }
};
