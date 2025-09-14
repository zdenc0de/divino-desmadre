import { useMutation } from "@tanstack/react-query"
import { useComentariosStore } from "../store/ComentariosStore";
import { useUsuariosStore } from "../store/UsuariosStore";
import { usePostStore } from "../store/PostStore";
import { useFormattedDate } from "../hooks/UseFormatDate";
import { toast } from "sonner";

export const useInsertarComentarioMutate = (p) => {
    const { insertarComentario } = useComentariosStore();
    const{ dataUsuarioAuth } = useUsuariosStore();
    const { itemSelect } = usePostStore()
    const fechaActual = useFormattedDate();
    return useMutation({
        mutationKey: ["insertar comentario"],
        mutationFn: () => insertarComentario({
            comentario: p.comentario,
            id_publicacion: p.id_publicacion || itemSelect?.id, 
            id_usuario: dataUsuarioAuth?.id, 
            fecha: fechaActual, 
        }),
        onError: (error) => {
            toast.error("Error al comentar post: " + error.message);
        }, 
        onSuccess: () => {
            toast.success("Comentario insertado correctamente");
            p.setComentario("");
        }
    })
}