import logo from "../assets/logoy2k.png"

export const LoginPage = () => {
    return (
        <main
        className="flex h-screen w-full ">
            {/* Lado Izquierdo - Banner */}
            <section
            className="bg-[url('https://wallpapers.com/images/hd/y2k-crystal-clear-cubes-hmdgpnf5eomqekcm.jpg')] flex fex-col justify-center items-center overflow-hidden">
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
            <section>

            </section>
        </main>
    )
}