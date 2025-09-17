import { useMutation } from "@tanstack/react-query"
import { useRespuestasComentariosStore } from "../store/RespuestasComentariosStore"
import { useFormattedDate } from "../hooks/useFormatDate"
import { useUsuariosStore } from "../store/UsuariosStore"
import { usePostStore } from "../store/PostStore"
import { useQuery } from "@tanstack/react-query"
import { useComentariosStore } from "../store/ComentariosStore"
import { toast } from "sonner"

export const useInsertarRespuestaComentarioMutate = () => {
    const { insertarRespuestaAComentario, respuestaActivaParaComentarioId, respuesta, setRespuesta } = useRespuestasComentariosStore()
    const fechaActual = useFormattedDate()
    const {dataUsuarioAuth} = useUsuariosStore()
    return useMutation({
        mutationKey: ["insertar respuesta a comentario"], 
        mutationFn: ()=> insertarRespuestaAComentario({
            id_comentario: respuestaActivaParaComentarioId, 
            comentario: respuesta,
            fecha: fechaActual, 
            id_usuario: dataUsuarioAuth?.id
        }), 
        onError: (error) => {
            toast.error("Error al insertar respuesta: " + error.message)
        }, 
        onSuccess: () => {
            toast.success("Respuesta insertada correctamente")
            setRespuesta("")
        }
    })
}

export const useMostrarRespuestaComentariosQuery = () => {
    const {mostrarRespuestaAComentario} = useRespuestasComentariosStore();
    const {itemSelect} = useComentariosStore();
    return useQuery({
        queryKey: ["mostrar respuesta comentarios", {id_comentario: itemSelect?.id }],
        queryFn: () => mostrarRespuestaAComentario({id_comentario: itemSelect?.id }),
        enabled: !! itemSelect?.id,
    })
}