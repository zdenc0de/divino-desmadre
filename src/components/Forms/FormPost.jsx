import { BtnClose } from "../ui/buttons/BtnClose"
import { useUsuariosStore } from "../../store/UsuariosStore"
import { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Icon } from "@iconify/react/dist/iconify.js";

export const FormPost = () => {

    const { dataUsuarioAuth } = useUsuariosStore()
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textarea = useRef(null);
    const [postText, setPostText] = useState("");
    const addEmoji = (emojiData) => {
        const emojiChar = emojiData.emoji
        const textarea = textarea.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        

    }

    return (
        <main className="fixed z-50 flex items-center justify-center inset-0">
            {/* Backdrop que cubre toda la pantalla */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer">
            </div>
            
            {/* Modal content con z-index mayor */}
            <section className="bg-white relative z-10 w-full max-w-md dark:bg-bg-dark rounded-lg shadow-xl">
                {/*header*/}
                <header className="flex items-center justify-between p-4 border-b border-gray-500/40">
                    <h2
                    className="text-xl font-semibold ">
                        Crear Publicacion
                    </h2>
                    <BtnClose />
                </header>
                {/* User info */}
                <main
                className="p-4 space-y-4">
                    <section
                    className="flex items-center gap-1">
                        <img
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                        src={dataUsuarioAuth?.foto_perfil} 
                        alt="Foto de perfil"
                        />
                        <div>
                            <span
                            className="font-medium">
                                {dataUsuarioAuth?.nombre}
                            </span>
                        </div>
                    </section>
                    <form>
                        <div
                        className="relative">
                            <textarea
                            ref={textarea}
                            placeholder="¿Qué estás pensando?"
                            className="w-full placeholder-gray-500 outline-none"
                            />
                            { showEmojiPicker && 
                                (<div
                                className="absolute top-10 left-10 mt-2">
                                    <EmojiPicker 
                                    onEmojiClick={addEmoji}
                                    theme="auto" />
                                </div>)
                            }
                            <div
                            className="mt-4 flex items-center justify-between">
                                <button
                                type="submit"
                                className="py-2 px-4 rounded-lg font-medium bg-primary text-white cursor-pointer">
                                    Publicar
                                </button>
                                <button
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                type="button"
                                className="p-1 text-black/50 dark:text-white/50 hover:bg-gray-700 rounded-full cursor-pointer hover:text-white hover:dark:text-white">
                                    <Icon icon="mdi:emoticon-outline"
                                    className="text-2xl" />
                                </button>
                            </div>
                        </div>
                    </form>
                </main>
                <footer>
                </footer>
            </section>
        </main>
    )
}