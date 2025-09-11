import { Icon } from "@iconify/react/dist/iconify.js"
import { PostImageFrame } from "./PostImageFrame"

export const PublicacionCard = ({item}) => {
    return (
        <div
        className="border-b border-gray-500/50 p-4">
               <div
               className="flex justify-between">
                   <div
                   className="flex items-center gap-3">
                    <img src="https://i.pinimg.com/736x/2d/3a/95/2d3a95301fb4fadd1a9d2a1ea1ecc10c.jpg"  
                    className="w-12 h-12 rounded-full object-cover "/>
                    <span
                    className="font-bold ">
                        Divino Desmadre
                    </span>

                   </div>
                   <div
                   className="flex items-center gap-2">
                    <span
                    className="text-gray-500 text-sm whitespace-nowrap">
                        hace 8h
                    </span>
                    <button>
                        <Icon 
                        icon="mdi:dots-horizontal" 
                        className="text-gray-500" />
                    </button>
                   </div>
               </div>
               <div
               className="mt-3">
                   <p
                   className="mb-2">
                    {item?.descripcion}
                   </p>
                   <div>
                    <PostImageFrame 
                    src={"https://tse1.mm.bing.net/th/id/OIP.GKq_s07K8lmVurS7GwVAvAHaJj?cb=thfc1&w=735&h=948&rs=1&pid=ImgDetMain&o=7&rm=3"} />
                   </div>
                   <div
                   className="flex justify-between mt-4">
                        <button>
                            <Icon
                            icon = {"mdi:heart-outline"} 
                            className="text-3xl p-1 rounded-full text-gray-400 hover:bg-[rgba(78, 184, 233, 0.5)] cursor-pointer"/>
                        </button>
                        <button
                        className="flex items-center gap-2 cursor-pointer">
                            <Icon
                            icon = {"mdi:comment-outline"} 
                            className="text-3xl p-1 rounded-full text-gray-400 cursor-pointer"/>
                            <span
                            className="text-xs md:text-sm text-gray-400">
                                Comentar
                            </span>
                        </button>
                   </div>
               </div>
        </div>
    )
}