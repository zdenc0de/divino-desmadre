import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

const tabla = "publicaciones";

// Función para subir archivo
const subirArchivo = async (id, file) => {
  const ruta = "publicaciones/" + id;
  const { data, error } = await supabase.storage
    .from("archivos")
    .upload(ruta, file, {
      cacheControl: "0",
      upsert: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  if (data) {
    const { data: urlimagen } = await supabase.storage
      .from("archivos")
      .getPublicUrl(ruta);
    return urlimagen.publicUrl; // Retorna la URL pública correcta
  }
  
  return null; // Importante: retornar algo si no hay data
};

// Función para editar publicación
const editarPublicacion = async (p) => {
  const { error } = await supabase.from(tabla).update(p).eq("id", p.id);
  if (error) {
    throw new Error(error.message);
  }
};

// Exportar la función independientemente
export const InsertarPostDB = async (p, file) => {
  const { data, error } = await supabase
    .from(tabla)
    .insert(p)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (file && data) { // Verificar que data exista
    const nuevo_id = data.id;
    const urlImagen = await subirArchivo(nuevo_id, file);
    if (urlImagen) {
      const pUrl = {
        url: urlImagen,
        id: nuevo_id,
      };
      await editarPublicacion(pUrl);
    }
  }

  return data;
};

export const usePostStore = create((set, get) => ({
  file: null,
  setFile: (p) => set({ file: p }),

  stateImage: false,
  setStateImage: () =>
    set((state) => ({ stateImage: !state.stateImage })),

  stateForm: false,
  setStateForm: (valor) => {
    // Permitir pasar un valor específico o toggle
    if (typeof valor === 'boolean') {
      set({ stateForm: valor });
    } else {
      set((state) => ({ stateForm: !state.stateForm }));
    }
  },

  // Incluir la función en el store para compatibilidad
  InsertarPostDB: InsertarPostDB,

  // Acción para insertar post
  insertarPostAction: async (p) => {
    const { file } = get();
    await InsertarPostDB(p, file);
  },
  
  // Estado para mostrar posts
  dataPost: null,
  
  // Función para mostrar posts
  mostrarPost: async (p) => {
    try {
      const { data, error } = await supabase
        .rpc("publicaciones_con_detalles", { _id_usuario: p.id_usuario })
        .range(p.desde, p.desde + p.hasta - 1);
      
      if (error) {
        throw new Error(error.message);
      }
      
      set({ dataPost: data });
      return data;
    } catch (error) {
      console.error("Error al cargar posts:", error);
      throw error;
    }
  }
}));