"use client"
import { sendMessage } from '@/api/messages'
import { useMessageContext } from '@/context/MessageContext'
import React from 'react'

export default function WelcomeCards() {

    const { setMessage } = useMessageContext()

    const handleClick = async (prompt: string) => {
        setMessage((prevMessage: any) => [...prevMessage, { role: "user", content: prompt }])
        let response = await sendMessage({ messages: prompt })
        await setMessage((prevMessages: any) => [...prevMessages, response.response]);
    }
    return (
        <div>
            <div className="container mt-16">
                <div className='flex  flex-col h-96   items-center justify-center space-y-3'>
                    <div onClick={() => { handleClick("What are Your Core Skills") }} className='bg-[--primary] text-white w-64 md:w-96 md:h-40 h-32 flex items-center justify-center md:text-lg text-sm font-medium rounded cursor-pointer'>What are Your Core Skills</div>
                    <div className="internalFlex flex space-x-3">
                        <div onClick={() => { handleClick("Tell me something About YourSelf") }} className="two bg-[--primary] text-white w-44 md:w-96 md:h-40 h-32 flex items-center text-center justify-center md:text-lg text-sm font-medium rounded cursor-pointer">Tell me something About YourSelf</div>
                        <div onClick={() => { handleClick("what is your Higher Level of Education") }} className="three bg-[--primary] text-white w-44 text-sm md:w-96 md:h-40 h-32 text-center flex items-center justify-center md:text-lg font-medium rounded cursor-pointer">What is your Highest Level of Education</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
