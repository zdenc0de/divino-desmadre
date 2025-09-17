import { useRef, useState } from "react";
import { usePostStore } from "../store/PostStore";
import imageCompression from "browser-image-compression";

export const useImageSelector = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const { setFile: setFilePost } = usePostStore();

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

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
          maxSizeMB: sizeMB > 1024 * 1024 ? 0.1 : 0.2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(selectedFile, options);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => setFileUrl(reader.result);
        setFile(compressedFile);
        setFilePost(compressedFile);
        setFileType("image");
      } catch (error) {
        console.error("Error al comprimir la imagen:", error);
        alert("Hubo un error al procesar la imagen. Intenta nuevamente.");
      }
    } else {
      const videoUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setFilePost(selectedFile);
      setFileUrl(videoUrl);
      setFileType("video");
    }
  };

  const removeImage = () => {
    setFile(null);
    setFileUrl(null);
    setFileType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;
    await handleImageChange({ target: { files: [droppedFile] } });
  };

  return {
    file,
    fileUrl,
    fileType,
    fileInputRef,
    isDragging,
    setIsDragging,
    openFileSelector,
    handleImageChange,
    removeImage,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
};
