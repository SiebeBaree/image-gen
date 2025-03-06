import { experimental_generateImage as generateImage } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1].content;

    try {
        const { image } = await generateImage({
            model: openai.image("dall-e-2"),
            prompt: userMessage,
            n: 1,
            size: "256x256",
        });

        return NextResponse.json({
            role: "assistant",
            content: "test",
            image: image.base64,
        });
    } catch (error) {
        console.error("Error generating image:", error);
        return new Response(JSON.stringify({ error: "Failed to generate image" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
