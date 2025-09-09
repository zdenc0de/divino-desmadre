import { useRef, useState } from "react";
import { usePostStore } from "../store/PostStore";
import imageCompression from "browser-image-compression";
import { set } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";

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
        const sizeMB = selectedFile.size / (1024 * 1024);
        
            const type = selectedFile.type;

            if (!type.startsWith("image/") && !type.startsWith("video/")) {
                alert("Por favor selecciona un archivo de imagen o video.");
                return;
            }
            if (type.startsWith("image/")) {
                if (sizeMB > 8) {
                    alert("El archivo es demasiado grande. El tamaño máximo es 8MB.");
                    return;
                }
                try {
                    const options = {
                        maxSizeMB: sizeMB > 1 ? 0.1 : 0.2,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    };
                    const compressedFile = await imageCompression(selectedFile, options);
                    const reader = new FileReader();
                    reader.readAsDataURL(compressedFile);
                     reader.onload = () => setFileUrl(reader.result);
                     setFile(compressedFile)
                     setFilePost(compressedFile)
                     setFileType("image");
                } catch (error) {
                    console.error("Error al comprimir la imagen:", error);
                    alert("Hubo un error al procesar la imagen. Intenta nuevamente.");
                }
            }
            else {
                const videoUrl = URL.createObjectURL(selectedFile);
                 setFile(selectedFile);
                 setFilePost(selectedFile);
                 setFileUrl(videoUrl);
                 setFileType("video");
            }
    }

    const removeImage = () => {
        setFile(null);
        setFileUrl(null);
        setFileType(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const handleDragEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDrop = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        const droppedFile = e.dataTransfer.files[0];
        if (!droppedFile) return;
        await handleImageChange({ target: {files: [droppedFile] } } );
    }


    return {
        file, fileUrl, fileType, fileInputRef, setIsDragging, openFileSelector, handleImageChange, removeImage, isDragging, handleDragEnter, handleDragLeave, handleDragOver, handleDrop
    }
}

export const ImageSelector = () => {
    const { file, fileUrl, fileType, fileInputRef, isDragging, setIsDragging, openFileSelector, handleImageChange, removeImage, handleDragEnter, handleDragLeave, handleDragOver, handleDrop } = useImageSelector();
    return (
    <section
    className="relative w-full max-w-md bg-[#1e1966da] rounded-lg shadow-xl overflow-hidden">
        <header
        className="relative h-12 flex items-center justify-center border-b border-gray-700">
            <h2
            className="text-white font-medium">
                Seleccionar imagen o video
            </h2>
            <button
            className="absolute right-4 text-gray-400 hover:text-white transition-colors duration-200">
                <Icon icon="mdi:close" 
                className="text-xl"/>
            </button>
        </header>
        <main
        className={`p-8 flex flex-col items-center justify-center min-h-[240px] transition-colors duration-300 ${isDragging ? "bg-[#1e1966/85.5]" : "bg-[#000000]"}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
            {
                fileUrl ? (
                <div
                className="relative inline-block group">
                    {fileType === "image" ? 
                    
                    (<img 
                        src={fileUrl} 
                        alt="preview" 
                        className="w-full max-w-[280px] max-h-[280px] rounded-lg object-contain transition-transform duration-300 group-hover:scale-[1.02]"/> 
                    ) : (
                    <video 
                        controls
                        src={fileUrl}
                        className="w-full max-w-[280px] max-h-[280px] rounded-lg object-contain" />
                    )}
                    <button
                    onClick={removeImage}
                    type="button"
                    className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-60 rounded-full border-none cursor-pointer flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 hover:bg-opacity-80">
                        <Icon 
                        icon="mdi:close" 
                        className="text-white text-lg" />
                    </button>
                    <button
                    type="button"
                    onClick={openFileSelector}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-black bg-opacity-60 rounded-full border-none cursor-pointer flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 hover:bg-opacity-90">
                        <Icon icon="mdi:pencil" 
                        className="text-white text-lg" />
                    </button>
                </div>
                ) : (
                    <>
                        <div
                    className="w-16 h-16 rounded-full bg-[#3a3b3c] flex items-center justify-center mb-4">
                        <Icon 
                        icon="mdi:video-image" 
                        className="text-gray-400 text-3xl"/>
                    </div>
                    <h3
                    className="text-white text-lg font-medium mb-1">
                        Agregar fotos/videos
                    </h3>
                    <p
                    className="text-gray-400 text-sm mb-4">
                        Arrastra o suelta 
                    </p>
                    <button
                    onClick={openFileSelector}
                    className="mt-6 px-4 py-2 bg-[#3a3b3c] text-white rounded-lg hover:bg-[#4a4b4c] transition-colors duration-200">
                        Seleccionar archivos
                    </button>
                    </>
                )}
        </main>

        <input type="file" 
        accept="image/*, video/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        />
    </section>)

};