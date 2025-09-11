import { useMutation, useQuery } from "@tanstack/react-query";
import { usePostStore } from "../store/PostStore";
import { InsertarPostDB } from "../store/PostStore"; // Import directo
import { useFormattedDate } from "../hooks/UseFormatDate";
import { useUsuariosStore } from "../store/UsuariosStore";
import { toast } from "sonner";

export const useInsertarPostMutate = () => {
    const { dataUsuarioAuth } = useUsuariosStore();
    const fechaActual = useFormattedDate();
    const { file, setStateForm, setFile } = usePostStore();

    return useMutation({
        mutationKey: ["Insertar Post"],
        mutationFn: async (data) => {
            let type = "imagen";
            if (file && file.name) {
                const ext = file.name.split(".").pop()?.toLowerCase();
                if (ext === "mp4") type = "video";
            }

            const p = {
                descripcion: data.descripcion,
                url: "-",
                fecha: fechaActual,
                id_usuario: dataUsuarioAuth?.id,
                type: type,
            };

            // Usar la función importada directamente
            const resultado = await InsertarPostDB(p, file);
            return resultado;
        },
        onError: (error) => {
            toast.error("Error al crear la publicación: " + error.message);
        },
        onSuccess: () => {
            toast.success("Publicación creada con éxito");
            // Cerrar el formulario y limpiar el estado
            setStateForm(false); // Pasar false explícitamente
            setFile(null); // Limpiar la imagen en el store
        },
    });
};

export const useMostrarPostQuery = () => {
    const { dataUsuarioAuth } = useUsuariosStore()
    const { mostrarPost } = usePostStore()
    return useQuery({
        queryKey: ["mostrar post", {id_usuario:dataUsuarioAuth?.id}],
        queryFn:() => mostrarPost({id_usuario:dataUsuarioAuth?.id, desde:0, hasta:3}),
    })
}