"use client";
import WelcomeCards from "../WelcomeCards/WelcomeCards";
import MessageInput from "../MessageInput/MessageInput";
import Messages from "../Messages/Messages";
import { useMessageContext } from "@/context/MessageContext";
import { AlignLeft } from "lucide-react";
import { useSideBarContext } from "@/context/SideBarContext";

interface Message {
    role: string;
    content: string;
}

export default function MainBar() {
    const { message } = useMessageContext();
    const { setSideBarOpen, isMobile } = useSideBarContext();

    return (
        <div className="md:flex-[8] w-full bg-[--secondary]">
            <div className="flex flex-col w-[90%] h-full mx-auto justify-between py-5 relative">
                {isMobile && (
                    <div
                        className="absolute text-white"
                        onClick={() => {
                            setSideBarOpen(true);
                        }}
                    >
                        <AlignLeft />
                    </div>
                )}
                {message.length <= 0 ? (
                    <WelcomeCards />
                ) : (
                    <div className="messages w-full h-full py-5 px-3 overflow-y-auto space-y-3 mt-3">
                        {message.map((item: Message, i: number) => (
                            <Messages key={i} messages={item} />
                        ))}
                    </div>
                )}
                <MessageInput />
            </div>
        </div>
    );
}
