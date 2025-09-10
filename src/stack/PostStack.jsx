import { useMutation } from "@tanstack/react-query"
import { usePostStore } from "../store/PostStore"
import { useFormattedDate } from "../hooks/UseFormatDate"
import { useUsuariosStore } from "../store/UsuariosStore"
import { toast } from "sonner"

export const useInsertarPostMutate = () => {
    const { dataUsuarioAuth } = useUsuariosStore()
    const fechaActual = useFormattedDate()
    const { InsertarPost, file } = usePostStore() // <-- traemos file de zustand

    return useMutation({
        mutationKey: ["Insertar Post"],
        mutationFn: async (data) => {
            let type = "imagen"
            if (file && file.name) {
                const ext = file.name.split(".").pop()?.toLowerCase()
                if (ext === "mp4") type = "video"
            }

            const p = {
                titulo: data.titulo,
                url: "-",
                fecha: fechaActual,
                id_usuario: dataUsuarioAuth?.id,
                type: type,
            }

            await InsertarPost(p, file)
        },
        onError: (error) => { // <-- corregido
            toast.error("Error al crear la publicación: " + error.message)
        },
        onSuccess: () => {
            toast.success("Publicación creada con éxito")
        },
    })
}
