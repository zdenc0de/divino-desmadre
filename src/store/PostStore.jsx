import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

const tabla = "publicaciones";

const insertarPostDB = async (p, file) => {
  const { data, error } = await supabase
    .from(tabla)
    .insert(p)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (file) {
    const nuevo_id = data?.id;
    const urlImagen = await subirArchivo(nuevo_id, file);
    const pUrl = {
      url: urlImagen,
      id: nuevo_id,
    };
    await editarPublicacion(pUrl);
  }
};

const editarPublicacion = async (p) => {
  const { error } = await supabase.from(tabla).update(p).eq("id", p.id);
  if (error) {
    throw new Error(error.message);
  }
};

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
    return urlimagen;
  }
};

export const usePostStore = create((set) => ({
  file: null,
  setFile: (p) => set({ file: p }),

  stateImage: false,
  setStateImage: () =>
    set((state) => ({ stateImage: !state.stateImage })),

  stateForm: false,
  setStateForm: () =>
    set((state) => ({ stateForm: !state.stateForm })),

  // acción con nombre distinto para evitar conflicto
  insertarPostAction: async (p, file) => {
    await insertarPostDB(p, file);
  },
}));
