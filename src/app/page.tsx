"use client";

import { useChat } from "@ai-sdk/react";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
    const [imageData, setImageData] = useState<string | null>(null);

    const { messages, input, handleInputChange, handleSubmit, status } = useChat({
        api: "/api/chat",
        onResponse: async (response) => {
            const data = await response.json();
            if (data.image) {
                setImageData(data.image);
            }
        },
    });
    const isLoading = status === "submitted" || status === "streaming";

    return (
        <div className="mx-auto w-full max-w-4xl p-4">
            <div className="mb-4 h-[60vh] overflow-y-auto rounded-lg border p-4">
                {messages.map((message) => (
                    <div key={message.id} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                        <div
                            className={`inline-block rounded-lg p-3 ${
                                message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                            }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}

                {imageData && (
                    <div className="mb-4 text-left">
                        <div className="inline-block rounded-lg bg-gray-200 p-3">
                            <Image
                                src={`data:image/png;base64,${imageData}`}
                                alt="Generated image"
                                width={512}
                                height={512}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div className="mb-4 text-left">
                        <div className="inline-block rounded-lg bg-gray-200 p-3">
                            <p>Thinking...</p>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask me to generate an image..."
                    className="flex-1 rounded border p-2"
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
                >
                    Send
                </button>
            </form>
            <p className="mt-2 text-sm text-gray-500">
                Try: &quot;Generate an image of a cat riding a skateboard&quot;
            </p>
        </div>
    );
}
