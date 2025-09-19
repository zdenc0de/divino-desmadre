import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore, useSubscription } from "../store/AuthStore";
import { useUsuariosStore } from "../store/UsuariosStore"
import { data } from "react-router-dom";
import { useGlobalStore } from "../store/GlobalStore";
import { toast } from "sonner";

export const useMostrarUsuarioAuthQuery = () => {
    const {mostrarUsuarioAuth} = useUsuariosStore();
    const {user} = useSubscription();
    return useQuery({
        queryKey: ["mostrar user auth"],
        queryFn: () => mostrarUsuarioAuth({id_auth: user?.id})
    })
}

export const useEditarFotoUserMutate = () => {
    const {file} = useGlobalStore();
    const {editarUsuarios, dataUsuarioAuth} = useUsuariosStore();
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["editar foto user"],
        mutationFn: async(data) => {
            // Validación temprana del archivo
            if (!file || file.size === undefined) {
                throw new Error("No seleccionaste ninguna imagen");
            }
            
            // Validación de datos requeridos
            if (!dataUsuarioAuth?.id) {
                throw new Error("No se encontró información del usuario");
            }
            
            if (!data.nombre || data.nombre.trim().length < 3) {
                throw new Error("El nombre debe tener al menos 3 caracteres");
            }
            
            const params = {
                nombre: data.nombre.trim(), 
                id: dataUsuarioAuth.id
            };
            
            // Llamada a la función de edición
            const result = await editarUsuarios(params, dataUsuarioAuth?.foto_perfil, file);
            return result;
        }, 
        onError: (error) => {
            console.error("Error en mutación:", error);
            toast.error(`Error al editar usuario: ${error.message}`);
        }, 
        onSuccess: (data) => {
            toast.success("Datos guardados correctamente");
            queryClient.invalidateQueries({queryKey: ["mostrar user auth"]});
        }
    });
}