import React from 'react';
import Image from 'next/image';

interface MessageProps {
    messages: {
        role: string;
        content: string;
    };
}

export default function Messages({ messages }: MessageProps) {
    return (
        <div className={` relative w-full flex ${messages.role === "system" ? "flex-row" : "flex-row-reverse"} space-x-1`}>
            <div className="flex items-start justify-center">
                <Image src={`${messages.role === "system" ? "logo.svg" : "logo.svg"}`} width={40} height={40} alt="Logo" />
            </div>
            <div
                className={`bg-gray-300 text-[--primary] w-96 p-4 rounded-xl ${messages.role === "system" ? "mr-auto" : "ml-auto"}`}
            >
                <div className="text-black">{messages.content}</div>
            </div>
        </div>
    );
}
