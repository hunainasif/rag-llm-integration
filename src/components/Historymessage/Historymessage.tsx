import React from 'react'
import { EllipsisVertical, MessageCircle } from 'lucide-react'
import moment from "moment"


export default function Historymessage() {
    const date: Date = new Date()
    const day = moment(date).format('dddd');
    const currentDate = moment(date).format('MMM Do YY')
    console.log(day)
    console.log(currentDate)
    return (
        <div className='flex items-center justify-between bg-[--secondary] text-[--primary] rounded p-2 py-4'>
            <MessageCircle />
            <div className="date font-bold">
                <span>{day}</span>
                <span> {currentDate}</span>
            </div>
            <EllipsisVertical />
        </div>
    )
}
