"use client";
import { sendMessage } from "@/api/messages";
import { useMessageContext } from "@/context/MessageContext";
import { SendHorizonal } from "lucide-react";
import React, { useState } from "react";

interface ResponseType {
    response: { role: string; content: string };
}

export default function MessageInput() {
    const [prompt, setPrompt] = useState<string>("");
    const { setMessage } = useMessageContext();

    const handleClick = async () => {
        if (!prompt.trim()) return;

        setMessage((prevMessage: { role: string; content: string }[]) => [
            ...prevMessage,
            { role: "user", content: prompt },
        ]);
        setPrompt("");

        const response: ResponseType = await sendMessage({ messages: prompt });
        setMessage((prevMessages: { role: string; content: string }[]) => [
            ...prevMessages,
            response.response,
        ]);
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            await handleClick();
            e.preventDefault();
        }
    };

    return (
        <div className="bg-red-300 flex mx-2">
            <input
                onKeyDown={handleKeyPress}
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                type="text"
                name="message"
                placeholder="How can I assist you?"
                className="text-white bg-[#303030] flex-[8] py-3 px-3 border-[--primary] border-2 border-solid outline-none"
            />
            <div
                className="flex-[1] flex items-center justify-center bg-white text-[--primary] cursor-pointer"
                onClick={handleClick}
            >
                <SendHorizonal />
            </div>
        </div>
    );
}
