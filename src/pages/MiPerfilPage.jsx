import { useMostrarUsuarioAuthQuery } from "../stack/UsuariosStack"

export const MiPerfilPage = () => {
    const {data, isLoading, error} = useMostrarUsuarioAuthQuery();
    if (isLoading) {
        return <span>Cargando...</span>
    }
    if (error) {
        return <span>Error: {error.message}</span>
    }
    return (
        <div
        className="h-screen bg-amber-300 text-black flex flex-col">
               <span>
                   MiPerfilPage
               </span>
               <span>
                Usuario: {data?.nombre}
                </span>
        </div>
    )
}
