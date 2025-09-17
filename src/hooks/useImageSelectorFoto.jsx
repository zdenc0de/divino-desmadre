import { Icon } from "@iconify/react/dist/iconify.js"
import { useRef } from "react"
import { toast } from "sonner";
import imageCompression from "browser-image-compression";
import { useGlobalStore } from "../store/GlobalStore";

export const ImageSelectorFoto = () => {
    const { setFile, setFileUrl, fileUrl } = useGlobalStore();
    const fileInputRef = useRef(null);
    
    function openFileSelector() {
        fileInputRef.current?.click();
    }

    const handleImageChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        
        if (!selectedFile.type.startsWith("image/")) {
            toast.error("Por favor selecciona un archivo de imagen válido.");
            return;
        }
        
        try {
            const options = {
                maxSizeMB: selectedFile.size > 1024 * 1024 ? 0.1 : 0.2,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };

            const compressedFile = await imageCompression(selectedFile, options);
            
            // Crear FileReader y manejar correctamente el evento asíncrono
            const fileReader = new FileReader();
            
            // Configurar el callback para cuando termine de leer
            fileReader.onload = (event) => {
                setFileUrl(event.target.result);
            };
            
            // Manejar errores de lectura
            fileReader.onerror = () => {
                toast.error("Error al leer la imagen");
            };
            
            // Establecer el archivo primero
            setFile(compressedFile);
            
            // Iniciar la lectura asíncrona
            fileReader.readAsDataURL(compressedFile);
            
        } catch (error) {
            toast.error("Error al subir la imagen: " + error.message);
        }
    }

    return (
        <div className="text-center mb-5">
            <div className="relative inline-block">
                <img 
                    src={fileUrl !== "-" ? fileUrl : "https://i.ibb.co/39y0kysq/subir.png"}
                    alt="imagen select"
                    className="w-20 h-20 rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                />
                <button
                    className="absolute top-2 left-14 w-7 h-7 bg-neutral-800 hover:bg-neutral-600 text-white rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
                    onClick={openFileSelector}
                >
                    <Icon 
                        icon="lets-icons:edit-fill"
                        className="text-[18px]"
                    />
                </button>
                <input 
                    ref={fileInputRef}
                    accept="image/jpeg, image/png, image/jpg"
                    type="file"
                    className="hidden" 
                    onChange={handleImageChange}
                />
            </div>
        </div>
    )
}