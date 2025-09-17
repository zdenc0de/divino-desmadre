import { ImageSelectorFoto } from "../../hooks/useImageSelectorFoto"

export const FormActualizarPerfil = () => {
    return (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
               <div
               className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
                    <h1
                    className="text-2xl font-bold mb-4 text-center">
                        Actualizar Perfil
                    </h1>
                    <section
                    className="flex flex-col gap-4 items-center mb-4">
                        <span
                        className="text-gray-500 dark:text-gray-300">
                            Agrega tu foto de perfil 
                        </span>
                        <ImageSelectorFoto />
                    </section>
               </div>
        </div>
    )
}