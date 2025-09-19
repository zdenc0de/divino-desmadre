import { useForm } from "react-hook-form";
import { ImageSelectorFoto } from "../../hooks/useImageSelectorFoto";
import { useEditarFotoUserMutate } from "../../stack/UsuariosStack";
import { useGlobalStore } from "../../store/GlobalStore";

export const FormActualizarPerfil = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();
  
  const { mutate, isLoading } = useEditarFotoUserMutate();
  const { file } = useGlobalStore();

  // Función que maneja el envío del formulario
  const onSubmit = (data) => {
    // Validación de imagen antes de enviar
    if (!file || file.size === undefined) {
      setError("root", {
        message: "Debes seleccionar una imagen de perfil"
      });
      return;
    }
    
    console.log("Datos del formulario:", data);
    mutate(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          Actualización de datos
        </h1>
        <section className="flex flex-col items-center gap-3 mb-6">
          <span className="text-gray-500 dark:text-gray-300">
            Agrega tu foto de perfil
          </span>
          <ImageSelectorFoto />
        </section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aff0]"
              type="text"
              placeholder="Nombre"
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 3 caracteres",
                },
              })}
            />
            <p className="py-1 text-red-500 font-bold">
              {errors.nombre?.message}
            </p>
          </div>
          
          {/* Error general del formulario */}
          {errors.root && (
            <div className="mb-4">
              <p className="py-1 text-red-500 font-bold text-center">
                {errors.root.message}
              </p>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-full bg-gray-200 text-gray-500 font-medium py-3 rounded-full hover:bg-[#00AFF0] hover:text-white transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "GUARDANDO..." : "GUARDAR"}
          </button>
        </form>
      </div>
    </div>
  );
};