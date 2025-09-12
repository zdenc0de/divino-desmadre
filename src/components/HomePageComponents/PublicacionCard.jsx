import { Icon } from "@iconify/react/dist/iconify.js"
import { PostImageFrame } from "./PostImageFrame"
import { PostVideoFrame } from "./PostVideoFrame"
import { usePostStore } from "../../store/PostStore"
import { useLikePostMutate } from "../../stack/PostStack"

export const PublicacionCard = ({item}) => {
    const { setItemSelect } = usePostStore();
    const { mutate } = useLikePostMutate()
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
                    {
                        item?.url !== "-" && (item?.type=== "imagen" ? (<PostImageFrame src={item?.url} />) : (<PostVideoFrame src={item?.url} />))
                    }
                   </div>
                   <div
                   className="flex justify-between mt-4">
                        <button
                        onClick={() => {
                            setItemSelect(item); 
                            mutate();
                        }}
                        >
                            <Icon
                            icon = { item?.like_usuario_actual?"mdi:heart" : "mdi:heart-outline"} 
                            className={`text-3xl p-1 rounded-full ${item?.like_usuario_actual?"text-red-500":"text-gray-400 hover:bg-[rgba(78, 184, 233, 0.5)]"}  cursor-pointer`}/>
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
                   <div
                   className="flex gap-4 mt-1">
                    {
                        item?.likes > 0 && (
                        <span 
                        className="text-xs text-gray-400"
                        >{item?.likes} me gusta </span>
                        )
                    }
                    {
                        item?.comentarios_count > 0 && (
                            <span
                            className="text-xs text-gray-400 cursor-pointer hover:underline"
                            >{item?.comentarios_count} comentarios</span>
                        )
                    }
                   </div>
               </div>
           </div>
       )
   }