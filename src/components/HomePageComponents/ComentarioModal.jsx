import { Icon } from "@iconify/react/dist/iconify.js"
import { BtnClose } from "../ui/buttons/BtnClose"
import { useInsertarComentarioMutate } from "../../stack/ComentariosStack"
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useComentariosStore } from "../../store/ComentariosStore";

export const ComentarioModal = ({item, onClose}) => {
    const [comentario, setComentario] = useState("");
    const { mutate: comentarioMutate } = useInsertarComentarioMutate({
        comentario: comentario, 
        setComentario: setComentario,
        id_publicacion: item?.id // Agregar el ID de la publicación
    });
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const pickerRef = useRef(null);
    const textComentarioRef = useRef(null);
    const emojiButtonRef = useRef(null);
    const { setShowModal } = useComentariosStore();

const addEmoji = (emojiData) => {
    const emojiChar = emojiData.emoji;
    const textarea = textComentarioRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const originalText = comentario;

    const newText =
      originalText.substring(0, start) +
      emojiChar +
      originalText.substring(end);

    setComentario(newText);

    // Reubicar el cursor justo después del emoji
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + emojiChar.length;
    }, 0);

    // Cerrar el picker después de seleccionar un emoji
    setShowEmojiPicker(false);
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
        <main
        className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <section
            className="dark:bg-neutral-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl flex flex-col relative">
                <header
                className="h-25 sticky p-4 border-b border-gray-500/50 bg-white dark:bg-neutral-900">
                    <div 
                    className="flex items-center gap-3 text-black dark:text-white">
                        <img 
                        src="https://locosxlosjuegos.com/wp-content/uploads/2022/09/sjsjs.jpg" 
                        className="w-12 h-12 rounded-full object-cover"
                         />
                         <span
                          className="font-bold lg:max-w-none lg:overflow-visible md:text-ellipsis max-w-[200px] truncate whitespace-nowrap overflow-hidden">
                             Divino Desmadre
                        </span>
                     </div>
                     <span>
                        Descripcion
                     </span>
                     <BtnClose funcion={setShowModal} />
                </header>
                <section
                className="flex-1 overflow-y-auto p-4 bg-white dark:bg-neutral-900">
                    <p>
                        Comentarios
                    </p>
                </section>
                <footer
                className="flex items-center gap-2 p-4 bg-white dark:bg-neutral-900">
                   
                    <section
                    className="w-full gap-2 flex flex-col">
                        <section
                        className="flex w-full gap-4">
                             <img 
                    src="https://locosxlosjuegos.com/wp-content/uploads/2022/09/sjsjs.jpg"
                    className="w-10 h-10 rounded-full object-cover" alt="Avatar"/>
                            <input 
                            ref={textComentarioRef}
                            className="flex-1 bg-gray-100 dark:bg-bg-dark text-sm rounded-2xl px-4 py-2 focus:outline-none resize-none"
                            placeholder="Escribe un comentario..."
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            />
                             {showEmojiPicker && (
                                            <div className="absolute top-10 left-10 mt-2 z-50" ref={pickerRef}>
                                              <EmojiPicker onEmojiClick={addEmoji} theme="auto" searchDisabled />
                                            </div>
                                          )}
                            <button
                                ref={emojiButtonRef}
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="text-gray-500 hover:text-gray-700 relative">
                                <Icon 
                                icon="mdi:emoticon-outline" 
                                className="text-xl" />
                            </button>
                        </section>
                        <section
                        className="flex justify-end">
                            <button
                            className="flex justify-end gap-1 px-4 py-2 rounded-full text-sm text-gray-500 cursor-not-allowed"
                            onClick={comentarioMutate}>
                                <Icon 
                                icon="mdi:send" 
                                width={20}
                                height={20} />
                                Publicar
                            </button>
                        </section>
                    </section>
                </footer>
            </section>
        </main>
    )
}