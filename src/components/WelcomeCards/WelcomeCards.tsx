import React from 'react'

export default function WelcomeCards() {
    return (
        <div>
            <div className="container mt-16">
                <div className='flex  flex-col h-96   items-center justify-center space-y-3'>
                    <div className='bg-[--primary] text-[--secondary] w-96 h-40 flex items-center justify-center text-lg font-medium rounded cursor-pointer'>What are Your Core Skills</div>
                    <div className="internalFlex flex space-x-3">
                        <div className="two bg-[--primary] text-[--secondary] w-96 h-40 flex items-center justify-center text-lg font-medium rounded cursor-pointer">Tell me something About YourSelf</div>
                        <div className="three bg-[--primary] text-[--secondary] w-96 h-40 flex items-center justify-center text-lg font-medium rounded cursor-pointer">what is your Higher Level of Education</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
