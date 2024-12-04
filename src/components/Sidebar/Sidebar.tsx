import { Link as LinkIcon, MessageSquare } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import Historymessage from '../Historymessage/Historymessage'
import Image from 'next/image'
export default function Sidebar() {
    return (
        <div className='flex-[2]  flex items-center justify-center'>
            <div className="container flex flex-col justify-between h-[95%] w-[90%]  ">
                {/* top section */}
                <div className="top flex flex-col">
                    <div className="logo flex justify-center my-2  py-2   ">
                        <Image src="logo.svg" width={40} height={40} alt='' />
                    </div>
                    <div className=' flex bg-[--primary]  my-2 py-3 mx-1 justify-center items-center space-x-1 rounded text-[--secondary]'>
                        <MessageSquare />
                        <span className='font-sem cursor-pointer'>New Chat</span>
                    </div>
                    <div className='text-lg text-center rounded  py-3 mx-1 font-bold text-[--primary]'>Chat History</div>
                    <div className="messageBox flex flex-col items-center h-80 my-2 overflow-y-auto space-y-1">
                        <Historymessage />
                        <Historymessage />
                        <Historymessage />
                        <Historymessage />
                        <Historymessage />
                        <Historymessage />
                        <Historymessage />
                        <Historymessage />
                        <Historymessage />
                        <Historymessage />
                        <Historymessage />
                        <Historymessage />
                        <Historymessage />
                    </div>
                </div>
                {/* bottom Section */}
                <div className="bottom text-[--primary]">
                    <ul className="flex flex-col space-y-2">
                        <Link href={`https://google.com`} className='flex   py-3 items-center justify-between '>
                            <span className='text-xl font-semibold'>GitHub</span>
                            <LinkIcon />
                        </Link>
                        <Link href={`https://google.com`} className='flex   py-3 items-center justify-between '>
                            <span className='text-xl font-semibold'>LinkedIn</span>
                            <LinkIcon />
                        </Link>

                    </ul>
                </div>
            </div>
        </div>
    )
}
