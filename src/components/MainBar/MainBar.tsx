import React from 'react'
import WelcomeCards from '../WelcomeCards/WelcomeCards'
import MessageInput from '../MessageInput/MessageInput'
import Messages from '../Messages/Messages'

interface generateMessage {
    role: string,
    content: string
}

export default function MainBar() {
    const messages: generateMessage[] = [
        { role: "user", content: "Write a haiku about recursion in programming." },
        { role: "system", content: "You are a helpful assistant Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat quasi a, vitae hic illo tempore nemo libero qui quos incidunt beatae aspernatur, voluptatibus, at quae impedit vero rerum quo dicta voluptatem numquam. Sit rerum quisquam culpa. Labore enim dolor similique tenetur sint voluptatem molestiae repudiandae ad est doloremque sunt cumque ea officiis, earum sequi? Sunt laboriosam sit cupiditate perferendis, cum doloribus minus aperiam nesciunt. Cum culpa expedita rerum minima eaque sapiente illum totam, aliquid quo repellendus nemo blanditiis nihil eligendi amet iure asperiores dolorem autem possimus deleniti in ipsum tenetur officiis ea. Earum nemo id voluptatibus placeat ex reprehenderit quas?." }
    ];

    return (
        <div className='flex-[8] bg-[--secondary]'>
            <div className='flex flex-col w-[90%] h-full mx-auto justify-between py-5'>
                {/* Uncomment the WelcomeCards component if needed */}
                <WelcomeCards />
                {/* <div className="messages   w-full h-full py-5 px-3">
                    {messages.map((item, i) => (
                        <Messages key={i} messages={item} />
                    ))}
                </div> */}
                <MessageInput />
            </div>
        </div>
    )
}
