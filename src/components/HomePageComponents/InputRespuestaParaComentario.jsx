import { useUsuariosStore } from "../../store/UsuariosStore"
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useInsertarRespuestaComentarioMutate } from "../../stack/RepuestasComentariosStack";
import { useRespuestasComentariosStore } from "../../store/RespuestasComentariosStore";
import { Icon } from "@iconify/react";

export const InputRespuestaParaComentario = () => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const pickerRef = useRef(null);
    const textComentarioRef = useRef(null);
    const emojiButtonRef = useRef(null);
    
    // Usar el estado del store en lugar de estado local
    const { respuesta, setRespuesta, limpiarRespuestaActiva } = useRespuestasComentariosStore();
    const { mutate: respuestaMutate, isPending } = useInsertarRespuestaComentarioMutate(); // Mutación correcta
    const { dataUsuarioAuth } = useUsuariosStore();

    const addEmoji = (emojiData) => {
        const emojiChar = emojiData.emoji;
        const textarea = textComentarioRef.current;
        if (!textarea) return;
    
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const originalText = respuesta; // Usar respuesta del store
    
        const newText =
          originalText.substring(0, start) +
          emojiChar +
          originalText.substring(end);
    
        setRespuesta(newText); // Actualizar el store
    
        // Reubicar el cursor justo después del emoji
        setTimeout(() => {
          textarea.focus();
          textarea.selectionStart = textarea.selectionEnd = start + emojiChar.length;
        }, 0);
    
        // Cerrar el picker después de seleccionar un emoji
        setShowEmojiPicker(false);
    };

    const handleEnviarRespuesta = () => {
        if (!respuesta.trim()) return;
        respuestaMutate();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleEnviarRespuesta();
        }
    };
    
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target) &&
                emojiButtonRef.current && !emojiButtonRef.current.contains(e.target)) {
                setShowEmojiPicker(false);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <section className="flex items-center gap-2 p-4 bg-white dark:bg-neutral-900">
            <section className="w-full gap-2 flex flex-col">
                <section className="flex w-full gap-4">
                    <img 
                        src={dataUsuarioAuth?.foto_perfil}
                        className="w-10 h-10 rounded-full object-cover" 
                        alt="Avatar"
                    />
                    <input 
                        ref={textComentarioRef}
                        className="flex-1 bg-gray-100 dark:bg-bg-dark text-sm rounded-2xl px-4 py-2 focus:outline-none resize-none"
                        placeholder="Escribe una respuesta..."
                        value={respuesta} // Usar respuesta del store
                        onChange={(e) => {
                            setRespuesta(e.target.value);
                            setRespuesta(e.target.value);
                        }} // Actualizar store
                        onKeyPress={handleKeyPress}
                        disabled={isPending}
                    />
                    {showEmojiPicker && (
                        <div className="absolute top-10 left-10 mt-2 z-50" ref={pickerRef}>
                            <EmojiPicker onEmojiClick={addEmoji} theme="auto" searchDisabled />
                        </div>
                    )}
                    <button
                        ref={emojiButtonRef}
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="text-gray-500 hover:text-gray-700 relative"
                        disabled={isPending}
                    >
                        <Icon 
                            icon="mdi:emoticon-outline" 
                            className="text-xl" 
                        />
                    </button>
                </section>
                <section className="flex justify-end">
                    <button
                        className={`flex justify-end gap-1 px-4 py-2 rounded-full text-sm ${
                            respuesta.trim() && !isPending
                                ? 'text-blue-500 hover:bg-blue-50 cursor-pointer' 
                                : 'text-gray-500 cursor-not-allowed'
                        }`}
                        onClick={handleEnviarRespuesta}
                        disabled={!respuesta.trim() || isPending}
                    >
                        <Icon 
                            icon={isPending ? "mdi:loading" : "mdi:send"}
                            width={20}
                            height={20} 
                            className={isPending ? "animate-spin" : ""}
                        />
                        {isPending ? "Enviando..." : "Publicar"}
                    </button>
                </section>
            </section>
        </section>
    );
};