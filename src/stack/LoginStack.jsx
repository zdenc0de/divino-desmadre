import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../store/AuthStore"
import { toast } from "sonner"

export const useCrearUsuarioYSesionMutate = (options = {}) => {
    const {crearUserYLogin, credenciales} = useAuthStore()
    return useMutation({
        mutationKey: ["Iniciar con email taster"],
        mutationFn: async() => {
            await crearUserYLogin({
                email:credenciales.email, 
                password:credenciales.password,
            })
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`)
        },
        onSuccess: () => {
            toast.success("Usuario creado y sesión iniciada")
            // Ejecutar el callback personalizado si existe
            if (options.onSuccess) {
                options.onSuccess()
            }
        }
    })
}