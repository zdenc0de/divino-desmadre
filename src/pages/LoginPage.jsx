import { Icon } from "@iconify/react/dist/iconify.js"
import logo from "../assets/logoy2k.png"
import { useState } from "react";

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

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
                            Only<span
                            className="text-[white]">
                                Devs
                            </span>
                        </span>
                    </div >
                    <div
                    className="flex flex-col">
                        <span
                    className="text-3xl font-semibold">
                        saludame chars
                    </span>
                    <span
                    className="text-3xl font-semibold">
                        saludame hp
                    </span>
                    <span
                    className="text-3xl font-semibold">
                        saludame ivan
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
                        className="relative">
                            <input
                            placeholder="Contraseña"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" />
                            <button
                            type="button"
                            className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
                            onClick={togglePasswordVisibility}>
                                <Icon 
                                icon = {showPassword?"mdi:eye-off":"mdi:eye"}/>
                            </button>
                        </div>
                        
                    </form>
                </div>
            </section>
        </main>
    )
}