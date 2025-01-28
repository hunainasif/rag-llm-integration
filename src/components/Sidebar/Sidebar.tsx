"use client"
import { Link as LinkIcon, MessageSquare, X } from 'lucide-react'
import Link from 'next/link'
import Historymessage from '../Historymessage/Historymessage'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useSideBarContext } from "@/context/SideBarContext"
import { useMessageContext } from '@/context/MessageContext'
export default function Sidebar() {
    const closeRef = useRef()
    const { sideBarOpen, setSideBarOpen, isMobile } = useSideBarContext()

    return (


        <div className={`bg-[--primary] flex-[2] h-full w-[60%] ${isMobile ? "absolute" : ""} z-10 flex items-center justify-center ${sideBarOpen ? "block" : "hidden"}`}>
            <div className="container flex flex-col justify-between h-[95%] w-[90%]  ">

                {/* top section */}
                <div className="top flex flex-col relative">
                    {isMobile && <div className={`md:hidden bg-white flex items-center justify-center w-10 h-10 top-3 rounded-full right-1 absolute $ `}
                        onClick={() => { setSideBarOpen(false) }}>
                        <X />
                    </div>}
                    <div className="logo flex justify-center my-2  py-2   ">
                        <Image src="logo.svg" width={40} height={40} alt='' />
                    </div>
                    <div className=' flex bg-[--secondary] text-white  my-2 py-3 mx-1 justify-center items-center space-x-1 rounded  '>
                        <MessageSquare />
                        <span className='font-sem cursor-pointer bg-[--secondary] text-white'>Ask Anything</span>
                    </div>
                    {/* todo section */}
                    {/*
                    <div className='text-lg text-center rounded  py-3 mx-1 font-bold text-white'>Chat History</div>
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
                    </div> */}
                </div>
                {/* bottom Section */}
                <div className="bottom text-white">
                    <ul className="flex flex-col space-y-2">
                        <Link href={`https://github.com/hunainasif`} className='flex   py-3 items-center justify-between '>
                            <span className='text-xl font-semibold'>GitHub</span>
                            <LinkIcon />
                        </Link>


                    </ul>
                </div>
            </div>
        </div>
        // </div>
    )
}
