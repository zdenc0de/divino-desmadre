import { BtnClose } from "../ui/buttons/BtnClose";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ImageSelector } from "../../hooks/useImageSelector";

export const FormPost = () => {
  const { dataUsuarioAuth } = useUsuariosStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);
  const pickerRef = useRef(null);
  const [postText, setPostText] = useState("");

  const addEmoji = (emojiData) => {
    const emojiChar = emojiData.emoji;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const originalText = textarea.value;

    const newText =
      originalText.substring(0, start) +
      emojiChar +
      originalText.substring(end);

    setPostText(newText);

    // Reubicar el cursor justo después del emoji
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + emojiChar.length;
    }, 0);
  };

  const handleTextareaChange = (e) => {
    setPostText(e.target.value);
  };

useEffect(() => {
  const handleClickOutside = (e) => {
    if (pickerRef.current && !pickerRef.current.contains(e.target)) {
      setShowEmojiPicker(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <main className="fixed z-50 flex items-center justify-center inset-0">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"></div>

      {/* Modal content */}
      <section className="bg-white relative z-10 w-full max-w-md dark:bg-bg-dark rounded-lg shadow-xl">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-500/40">
          <h2 className="text-xl font-semibold">Crear Publicación</h2>
          <BtnClose />
        </header>

        {/* User info + form */}
        <main className="p-4 space-y-4">
          <section className="flex items-center gap-1">
            <img
              className="w-10 h-10 rounded-full mr-3 object-cover"
              src={dataUsuarioAuth?.foto_perfil}
              alt="Foto de perfil"
            />
            <div>
              <span className="font-medium">{dataUsuarioAuth?.nombre}</span>
            </div>
          </section>

          <form>
            <div className="relative">
              <textarea
                ref={textareaRef}
                placeholder="¿Qué estás pensando?"
                className="w-full placeholder-gray-500 outline-none"
                value={postText} // <- textarea controlado
                onChange={handleTextareaChange}
              />

              {showEmojiPicker && (
                <div className="absolute top-10 left-10 mt-2 z-50" ref={pickerRef}>
                  <EmojiPicker onEmojiClick={addEmoji} theme="auto" searchDisabled/>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="submit"
                  className="py-2 px-4 rounded-lg font-medium bg-primary text-white cursor-pointer"
                >
                  Publicar
                </button>
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  type="button"
                  className="p-1 text-black/50 dark:text-white/50 hover:bg-gray-700 rounded-full cursor-pointer hover:text-white hover:dark:text-white"
                >
                  <Icon icon="mdi:emoticon-outline" className="text-2xl" />
                </button>
              </div>
            </div>
          </form>
          <ImageSelector />
        </main>
      <footer
        className="p-4 border-t border-gray-500/40">
          <div
          className="flex items-center justify-between p-3 border border-gray-500/40 rounded-lg">
              <span
              className="text-sm dark:text-white">
                  Agrega a tu publicación
              </span>
              <div
              className="flex space-x-4">
                  <button
                  className="p-1 rounded-full text-black/50 dark:text-white/50 hover:bg-gray-700 cursor-pointer hover:text-white hover:dark:text-white text-xl">
                      <Icon icon="mdi:image-outline" className="text-2xl" />
                  </button>
              </div>
          </div>
      </footer>
      </section>
    </main>
  );
};
