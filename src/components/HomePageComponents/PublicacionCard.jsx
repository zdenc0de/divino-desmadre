import { Icon } from "@iconify/react/dist/iconify.js"
import { PostImageFrame } from "./PostImageFrame"

export const PublicacionCard = () => {
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
                       saludame porras
                   </p>
                   <div>
                    <PostImageFrame src={"https://tse1.mm.bing.net/th/id/OIP.GKq_s07K8lmVurS7GwVAvAHaJj?cb=thfc1&w=735&h=948&rs=1&pid=ImgDetMain&o=7&rm=3"} />
                   </div>
               </div>
        </div>
    )
}