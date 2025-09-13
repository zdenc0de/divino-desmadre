import { Icon } from "@iconify/react/dist/iconify.js"
import { BtnClose } from "../ui/buttons/BtnClose"

export const ComentarioModal = ({item, onClose}) => {
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
                     <BtnClose onClick={onClose} />
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
                            className="flex-1 bg-gray-100 dark:bg-bg-dark text-sm rounded-2xl px-4 py-2 focus:outline-none resize-none"
                            placeholder="Escribe un comentario..."
                            />
                            <button
                            className="text-gray-500 hover:text-gray-700 relative">
                                <Icon 
                                icon="mdi:emoticon-outline" 
                                className="text-xl" />
                            </button>
                        </section>
                        <section
                        className="flex justify-end">
                            <button
                            className="flex justify-end gap-1 px-4 py-2 rounded-full text-sm text-gray-500 cursor-not-allowed">
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