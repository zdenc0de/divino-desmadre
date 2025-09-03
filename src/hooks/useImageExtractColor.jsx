import { FastAverageColor } from "fast-average-color"
import { useEffect, useState } from "react"
export function useImageExtractColor(imgRef, src) {
    const [bgColor, setBgColor] = useState("#000000")
    useEffect(() => {
        const fac = new FastAverageColor()
        const img = imgRef.current;
        if (!img) return;
        const handleLoad = async () => {
            try {
                const color = await fac.getColorAsync(img);
                setBgColor(color.hex);
            } catch (error) {
                console.error("Error extracting color:", error);
            }
        }
        if (img.complete) {
            handleLoad();
        } else {
            img.addEventListener("load", handleLoad);
            return () => img.removeEventListener("load", handleLoad);
        }

    }, [src]);
    return bgColor;
}