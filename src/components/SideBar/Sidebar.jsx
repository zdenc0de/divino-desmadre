import { Icon } from "@iconify/react/dist/iconify.js"
import { NavLink } from "react-router-dom"
import { BtnToggleTheme } from "../ui/buttons/BtnToggleTheme"
import { BtnLogout } from "../ui/buttons/BtnLogout"
import { BtnNewPost } from "../ui/buttons/BtnNewPost"

export const Sidebar = () => {
    const links = [
        {
            label: "Inicio",
            icon: "ion:home",
            to: "/",
        },
        {
            label: "Notificaciones",
            icon: "ion:notifications", // Checar
            to: "/notificaciones",
        },
        {
            label: "Mensajes",
            icon: "ion:chatbubbles",
            to: "/mensajes",
        },
        {
            label: "Colecciones",
            icon: "ic:baseline-collections-bookmark",
            to: "/colecciones",
        },
        {
            label: "Suscripciones",
            icon: "ic:baseline-person",
            to: "/suscripciones",
        },
        {
            label: "Añadir Tarjeta",
            icon: "ic:baseline-credit-card",
            to: "/tarjeta",
        },
        {
            label: "Mi perfil",
            icon: "ic:baseline-account-circle",
            to: "/miperfil",
        },
    ]
    return (
        <div 
        className="h-screen p-2 bg-white dark:bg-bg-dark transition-all duration-300 flex flex-col">
            {
                /* Logo */
            }
            <div 
            className="flex justify-center items-center h-8 w-8 rounded-full bg-primary text-white font-bold text-xs m-2">
                DD
            </div>  
            <nav 
            className="flex-1 flex flex-col gap-2 items-center">
                {links.map((item, index) => {
                    return (
                        <NavLink
                            key={index}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-2 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-primary/10 dark:hover:text-primary transition-all w-full justify-center sm:justify-start
                                ${
                                    isActive
                                        ? "text-blue-600 dark:text-white"
                                        : "text-gray-600 dark:text-gray-400"
                                }`
                            }
                        >
                            <Icon 
                            icon={item.icon} width={24} height={24} />
                            <span 
                            className="hidden sm:block">
                                {item.label}
                            </span>
                        </NavLink>
                    )
                })}
            </nav>
            <BtnToggleTheme />
            <BtnLogout 
            />
            <BtnNewPost />
        </div>
    )
}