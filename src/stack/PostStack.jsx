import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePostStore } from "../store/PostStore";
import { InsertarPostDB } from "../store/PostStore";
import { useFormattedDate } from "../hooks/UseFormatDate";
import { useUsuariosStore } from "../store/UsuariosStore";
import { toast } from "sonner";

export const useInsertarPostMutate = () => {
    const { dataUsuarioAuth } = useUsuariosStore();
    const fechaActual = useFormattedDate();
    const { file, setStateForm, setFile } = usePostStore();
    const queryClient = useQueryClient(); // Agregar queryClient

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

            const resultado = await InsertarPostDB(p, file);
            return resultado;
        },
        onError: (error) => {
            toast.error("Error al crear la publicación: " + error.message);
        },
        onSuccess: () => {
            toast.success("Publicación creada con éxito");
            
            // Invalidar la query para actualizar los posts
            queryClient.invalidateQueries({
                queryKey: ["mostrar post"]
            });
            
            // Cerrar el formulario y limpiar el estado
            setStateForm(false);
            setFile(null);
        },
    });
};

// Resto de tus hooks...
export const useLikePostMutate = () => {
    const { likePost, itemSelect } = usePostStore()
    const { dataUsuarioAuth } = useUsuariosStore()
    const queryClient = useQueryClient(); // Agregar también aquí
    
    return useMutation({
        mutationKey: ["like post"],
        mutationFn: () => 
            likePost({p_post_id: itemSelect?.id, p_user_id: dataUsuarioAuth?.id}),
        onError: (error) => {
            toast.error("Error al dar like: " + error.message)
        },
        onSuccess: () => {
            // Invalidar queries relacionadas después del like
            queryClient.invalidateQueries({
                queryKey: ["mostrar post"]
            });
        }
    })
}

export const useMostrarPostQuery = () => {
    const { dataUsuarioAuth } = useUsuariosStore()
    const { mostrarPost } = usePostStore()
    const cant_pagina = 10
    
    return useInfiniteQuery({
        queryKey: ["mostrar post", {id_usuario: dataUsuarioAuth?.id}],
        queryFn: async({pageParam = 0}) => {
            const data = await mostrarPost({
                id_usuario: dataUsuarioAuth?.id,
                desde: pageParam,
                hasta: cant_pagina, 
            });
            return data;
        }, 
        getNextPageParam: (lastPage, allPages) => {
            if(!lastPage || lastPage.length < cant_pagina) return undefined
            return allPages.length * cant_pagina;
        },
        initialPageParam: 0,
    })
}