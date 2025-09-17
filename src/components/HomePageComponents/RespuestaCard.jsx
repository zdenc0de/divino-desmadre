import { Icon } from "@iconify/react/dist/iconify.js";
import { useRelativeTime } from "../../hooks/useRelativeTime"; 

export const RespuestaCard = ({ item }) => {
    return (
        <div className="ml-12 mt-2 flex items-start gap-2 group">
            {/* Línea conectora */}
            <div className="w-4 h-4 border-l-2 border-b-2 border-gray-300 dark:border-gray-600 rounded-bl-[8px] absolute -ml-[29px] -mt-2"></div>
            
            {/* Avatar del usuario */}
            <img 
                src={item?.usuarios?.foto_perfil || "https://placehold.co/40x40"}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                alt="Avatar"
            />
            
            {/* Contenido de la respuesta */}
            <div className="flex-1">
                <div className="relative bg-gray-100 dark:bg-neutral-800 p-2 rounded-xl text-sm w-fit max-w-[85%]">
                    <span className="font-semibold block text-xs text-gray-900 dark:text-gray-100">
                        {item?.usuarios?.nombre || "Usuario"}
                    </span>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">
                        {item?.comentario}
                    </p>
                </div>
                
                {/* Metadata de la respuesta */}
                <div className="flex items-center gap-3 mt-1 ml-2">
                    <span className="text-xs text-gray-500">
                        {useRelativeTime(item?.fecha)}
                    </span>
                    <button className="text-xs text-gray-500 hover:underline cursor-pointer">
                        Responder
                    </button>
                    
                    {/* Acciones adicionales que aparecen en hover */}
                    <div className="hidden group-hover:flex items-center gap-2">
                        <button className="text-xs text-gray-500 hover:text-red-500 transition-colors">
                            <Icon icon="mdi:delete-outline" width={14} />
                        </button>
                        <button className="text-xs text-gray-500 hover:text-blue-500 transition-colors">
                            <Icon icon="mdi:heart-outline" width={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}