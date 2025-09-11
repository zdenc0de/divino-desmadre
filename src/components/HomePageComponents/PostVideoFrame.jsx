import { useRef, useState } from "react"
import { useImageExtractColor } from "../../hooks/useImageExtractColor"

export const PostVideoFrame = ({src}) => {
    const imgRef = useRef(null)
    const bgColor = useImageExtractColor(imgRef, src)

    return (
        <div
        className="rounded-lg overflow-hidden flex items-center justify-center max-h-[500px]"
        style={{ backgroundColor: bgColor }}>
               <video
               muted
               ref={imgRef}
               src = {src} 
               controls 
               crossOrigin="anonymous"
               className="object-contain max-h-[500px] w-full"/>
        </div>
    )
}