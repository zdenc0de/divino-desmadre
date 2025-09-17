import { useRelativeTime } from "../../hooks/useRelativeTime";
import { useMostrarRespuestaComentariosQuery } from "../../stack/RepuestasComentariosStack";
import { useComentariosStore } from "../../store/ComentariosStore";
import { useRespuestasComentariosStore } from "../../store/RespuestasComentariosStore";
import { InputRespuestaParaComentario } from "./InputRespuestaParaComentario";

export const ComentarioCard = ({ item }) => {
    const {respuestaActivaParaComentarioId, limpiarRespuestaActiva, setRespuestaActiva} = useRespuestasComentariosStore()
    const {setItemSelect} = useComentariosStore()

    return (
        <div
        className="pl-4 ">
            <div
            className="flex items-start gap-2 group relative w-full">
                <img
                src={item?.foto_usuario} 
                className="w-10 h-10 rounded-full object-cover"
                alt="Avatar"
                />
                <div
                className="flex-1 relative">
                    <div
                    className="relative bg-gray-100 dark:bg-neutral-800 p-2 rounded-xl text-sm w-fit max-w-[90%] flex gap-2">
                        <section>
                            <span
                            className="font-semibold block text-xs">
                                {item?.nombre_usuario}
                            </span>
                            <p>
                                {item?.comentario}
                            </p>
                        </section>

                    </div>
                    <div
                    className="flex gap-3 mt-1 text-xs text-gray-500 ml-2 relative">
                        <span>
                            {useRelativeTime(item?.fecha)}
                        </span>
                        <button
                        className="hover:underline cursor-pointer"
                        onClick={() => respuestaActivaParaComentarioId === item?.id ? limpiarRespuestaActiva() : setRespuestaActiva(item?.id)}>
                            {
                                respuestaActivaParaComentarioId === item?.id ? "Cancelar" : "Responder"
                            }
                        </button>

                    </div>
                    {
                        item?.respuestas_count > 0 && (
                            <button
                            className="text-xs text-gray-500 mt-2 hover:underline cursor-pointer"
                            onClick={() => setItemSelect(item)}>
                                {
                                    item?.respuestas_count === 1 ? (`Ver ${item?.respuestas_count} respuesta`) : (`Ver ${item?.respuestas_count} respuestas`)
                                }
                            </button>
                        )
                    }
                    {
                        respuestaActivaParaComentarioId === item?.id && (
                            <div>
                                <div 
                                className="w-4 h-4 border-l-2 border-b-2 border-gray-300 dark:border-gray-600 rounded-bl-[8px] absolute bottom-18 -ml-[29px]"/>
                                <InputRespuestaParaComentario />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}