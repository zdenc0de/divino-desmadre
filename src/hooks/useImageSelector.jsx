import { useRef, useState } from "react";
import { usePostStore } from "../store/PostStore";

export const useImageSelector = () => {

    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileType, setFileType] = useState(null);
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const {setFile:setFilePost} = usePostStore();
    const openFileSelector = () => {
        fileInputRef.current?.click();
    }

    const handleImageChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
            const type = selectedFile.type;
            if (!type.startsWith("image/") && !type.startsWith("video/")) {
                alert("Por favor selecciona un archivo de imagen o video.");
                return;
            }
            if (type.startsWith("image/")) {
                
            }
    }
    return (
        <div
        className="h-screen bg-amber-300 text-black">
               <span>
                   useImageSelector
               </span>
        </div>
    );
}

export const ImageSelector = () => {
    return (
        <div
        className="h-screen bg-amber-300 text-black">
               <span>
                   ImageSelector
               </span>
        </div>
    );
}