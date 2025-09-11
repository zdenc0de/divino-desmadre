import { useEffect, useRef, useState } from "react"
import { useImageExtractColor } from "../../hooks/useImageExtractColor"
import { FastAverageColor } from "fast-average-color"

export const PostVideoFrame = ({src}) => {
    const videoRef = useRef(null)
    const [bgColor, setBgColor] = useState("#e5e7eb")
    // Observar si esta en pantalla y pausar/reproducir el video

    // Capturar el color del primer frame 
    useEffect(() => {
        const fac = new FastAverageColor()
        const video = videoRef.current;
        if (!video) return;
        const capturarFrame = () => {
            const canvas = document.createElement('canvas');
             canvas.width = video.videoWidth;
             canvas.height = video.videoHeight;
             const ctx = canvas.getContext('2d');
             ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
             const dataUrl = canvas.toDataURL("image/jpeg");
                const img = new Image();
                img.src = dataUrl;
                img.crossOrigin = "Anonymous";
                img.onload = async () => {
                    try {
                        const color = await fac.getColorAsync(img);
                        setBgColor(color.hex);
                    } catch (error) {
                        console.warn("Error al capturar el color del video:", error);
                    }
                };
            }
        const onLoaded = () => {
            capturarFrame();
        }
        video.addEventListener("loadeddata", onLoaded);
        return () => {
            video.removeEventListener("loadeddata", onLoaded);
        }
    }, [src])


    return (
        <div
        className="rounded-lg overflow-hidden flex items-center justify-center max-h-[500px]"
        style={{ backgroundColor: bgColor }}>
               <video
               muted
               ref={videoRef}
               src = {src} 
               controls 
               crossOrigin="anonymous"
               className="object-contain max-h-[500px] w-full"/>
        </div>
    )
}