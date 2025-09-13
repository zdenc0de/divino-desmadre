export const ComentarioModal = ({item, onClose}) => {
    return (
        <main
        className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <section
            className="dark:bg-neutral-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl flex flex-col">
                <header>
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
                </header>
              <span>
                   ComentarioModal
               </span>  
            </section>
        </main>
    )
}