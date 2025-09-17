import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRespuestasComentariosStore } from "../store/RespuestasComentariosStore"
import { useFormattedDate } from "../hooks/useFormatDate"
import { useUsuariosStore } from "../store/UsuariosStore"
import { useQuery } from "@tanstack/react-query"
import { useComentariosStore } from "../store/ComentariosStore"
import { toast } from "sonner"

export const useInsertarRespuestaComentarioMutate = () => {
    const { 
        insertarRespuestaAComentario, 
        respuestaActivaParaComentarioId, 
        respuesta, 
        setRespuesta,
        limpiarRespuestaActiva 
    } = useRespuestasComentariosStore();
    
    const fechaActual = useFormattedDate();
    const { dataUsuarioAuth } = useUsuariosStore();
    const queryClient = useQueryClient(); // ← Esto faltaba
    
    return useMutation({
        mutationKey: ["insertar respuesta a comentario"], 
        mutationFn: () => insertarRespuestaAComentario({
            id_comentario: respuestaActivaParaComentarioId, 
            comentario: respuesta,
            fecha: fechaActual, 
            id_usuario: dataUsuarioAuth?.id
        }), 
        onError: (error) => {
            console.error("Error completo:", error);
            toast.error("Error al insertar respuesta: " + error.message);
        }, 
        onSuccess: (data) => {
            console.log("Respuesta insertada exitosamente:", data);
            toast.success("Respuesta insertada correctamente");
            setRespuesta("");
            limpiarRespuestaActiva(); // ← Esto faltaba
            
            // Invalidar queries relacionadas
            queryClient.invalidateQueries({ 
                queryKey: ["mostrar respuesta comentarios"] 
            });
            queryClient.invalidateQueries({ 
                queryKey: ["mostrar comentarios"] 
            });
            queryClient.invalidateQueries({ 
                queryKey: ["comentarios"] 
            });
            
            // También invalidar la query específica del comentario actual
            queryClient.invalidateQueries({ 
                queryKey: ["mostrar respuesta comentarios", { id_comentario: respuestaActivaParaComentarioId }] 
            });
        }
    });
}

export const useMostrarRespuestaComentariosQuery = () => {
    const { mostrarRespuestaAComentario } = useRespuestasComentariosStore();
    const { itemSelect } = useComentariosStore();
    
    return useQuery({
        queryKey: ["mostrar respuesta comentarios", { id_comentario: itemSelect?.id }],
        queryFn: () => mostrarRespuestaAComentario({ id_comentario: itemSelect?.id }),
        enabled: !!itemSelect?.id,
        staleTime: 0, // Asegurar que siempre busque datos frescos
        refetchOnWindowFocus: true,
    });
}