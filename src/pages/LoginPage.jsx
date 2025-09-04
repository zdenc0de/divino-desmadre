import { Icon } from "@iconify/react/dist/iconify.js"
import logo from "../assets/logoy2k.png"
import { useEffect, useState } from "react";
import { useGenerarCodigosAleatorios } from "../hooks/useGenerarCodigosAleatorios";
import { useAuthStore } from "../store/AuthStore";
import { set } from "react-hook-form";

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { setCredenciales } = useAuthStore();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    useEffect(() => {
        const response = useGenerarCodigosAleatorios();
        const correoCompleto = response+"gmail.com";
        setCredenciales({email:correoCompleto, password:response})
    }, [])

    return (
        <main
        className="flex h-screen w-full ">
            {/* Lado Izquierdo - Banner */}
            <section
            className="hidden md:flex md:w-1/2 bg-[url('https://wallpapers.com/images/hd/y2k-crystal-clear-cubes-hmdgpnf5eomqekcm.jpg')] flex-col justify-center items-center overflow-hidden ">
                <div
                className="px-8 text-white text-center flex flex-col gap-2">
                    <div
                    className="flex items-center gap-3">
                        <img src={logo} 
                        className="h-10 w-10"
                        alt="Logo" />
                        <span
                        className="text-4xl font-bold text-[#06068e]">
                            divino<span
                            className="text-[white]">
                                desmadre
                            </span>
                        </span>
                    </div >
                    <div
                    className="flex flex-col">
                        <span
                    className="text-3xl font-semibold">
                        how many
                    </span>
                    <span
                    className="text-3xl font-semibold">
                        times do I have
                    </span>
                    <span
                    className="text-3xl font-semibold">
                        to say were not enemies
                    </span>
                    <span
                    className="text-3xl font-semibold text-black">
                        ????????
                    </span>
                    </div>
                </div>
            </section>
            {/* Lado Izquierdo - Formulario LogIn */}   
            <section
            className="bg-white w-full md:w-1/2 flex items-center justify-center px-6 md:px-16 py-8">
                <div
                className="w-full max-w-md">
                    <h1
                    className="text-2xl font-medium mb-6 text-center">
                        Iniciar Sesión <span className="text-blue-500">(modo invitado)</span>
                    </h1>
                    <form>
                        <div
                        className="mb-4">
                            <input
                            placeholder="Usuario"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                        </div>
                        <div
                        className=" mb-4 relative">
                            <input
                            placeholder="Contraseña"
                            type={showPassword ? "text" : "password"}
                            className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-textfield-decoration-container]:hidden"
                            autoComplete="current-password" />
                            <button
                            type="button"
                            className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 cursor-pointer z-10"
                            onClick={togglePasswordVisibility}>
                                <Icon 
                                icon = {showPassword?"mdi:eye-off":"mdi:eye"}/>
                            </button>
                        </div>
                        <button
                        type="submit"
                        className="w-full font-bold bg-[#4F46E5] text-white py-3 rounded-lg hover:bg-[#3730a3] transition-colors mb-4">
                            INICIAR SESIÓN
                        </button>
                    </form>
                    <div
                    className="mt-4 text-xs text-gray-500 text-center">
                        Al iniciar sesión, aceptas nuestras <span className="text-blue-500 cursor-pointer">Condiciones</span>, la <span className="text-blue-500 cursor-pointer">Política de datos</span> y la <span className="text-blue-500 cursor-pointer">Política de cookies</span>.
                        <a href="#" className="text-blue-500 cursor-pointer"> Más información</a>
                    </div>
                    <div
                    className="mt-6 text-center">
                        ¿Olvidaste tu contraseña? <a href="#" className="text-blue-500 font-semibold cursor-pointer">Recuperar contraseña</a>
                        <div
                        className="mt-6 text-center">
                        ¿No tienes una cuenta? <a href="#" className="text-blue-500 font-semibold cursor-pointer">Regístrate</a>
                        </div>
                    </div>
                    <div
                    className="mt-6 text-center text-gray-400 text-sm">
                        &copy; 2025 zdenc0de. Todos los derechos reservados.
                    </div>
                </div>
            </section>
        </main>
    )
}