import { useMutation } from "@tanstack/react-query"
import { usePostStore } from "../store/PostStore"
import { InsertarPostDB } from "../store/PostStore" // <-- IMPORT DIRECTO
import { useFormattedDate } from "../hooks/UseFormatDate"
import { useUsuariosStore } from "../store/UsuariosStore"
import { toast } from "sonner"

export const useInsertarPostMutate = () => {
    const { dataUsuarioAuth } = useUsuariosStore()
    const fechaActual = useFormattedDate()
    const { file, setStateForm, setFile } = usePostStore() // <-- Solo traemos file y setStateForm

    return useMutation({
        mutationKey: ["Insertar Post"],
        mutationFn: async (data) => {
            let type = "imagen"
            if (file && file.name) {
                const ext = file.name.split(".").pop()?.toLowerCase()
                if (ext === "mp4") type = "video"
            }

            const p = {
                descripcion: data.descripcion,
                url: "-",
                fecha: fechaActual,
                id_usuario: dataUsuarioAuth?.id,
                type: type,
            }

            // Usar la función importada directamente
            await InsertarPostDB(p, file)
        },
        onError: (error) => {
            toast.error("Error al crear la publicación: " + error.message)
        },
        onSuccess: () => {
            toast.success("Publicación creada con éxito")
            // Opcional: cerrar el formulario después de éxitoº
            setStateForm(false)
            setFile(null) // Limpiar la imagen en el store
        },
    })
}