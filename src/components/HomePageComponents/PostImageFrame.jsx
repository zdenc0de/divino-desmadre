import { useState } from "react"

export const PostImageFrame = () => {

    return (
        <div
        className="rounded-lg overflow-hidden flex items-center justify-center max-h-[500px] bg-blue-950">
               <img
               src = "https://i.pinimg.com/1200x/1d/71/4d/1d714db43e55936e49299a3330e33374.jpg" 
               className="object-contain max-h-[500px]"/>
        </div>
    )
}