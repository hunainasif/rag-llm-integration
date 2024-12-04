import { SendHorizonal } from 'lucide-react'
import React from 'react'

export default function MessageInput() {
    return (
        <div className='bg-red-300 flex mx-2'>
            <input type="text" name="message" placeholder='How can I assist you?' id="" className='text-[--primary] flex-[8] py-3 px-3 border-[--primary] border-2 border-solid outline-none' />
            <div className='flex-[1] flex items-center justify-center bg-[--primary] text-[--secondary]'>
                <SendHorizonal />
            </div>
        </div>
    )
}
