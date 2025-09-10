import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

const tabla = "publicaciones"
const InsertarPost = async (p, file) => {
    const { data, error } = await supabase
    .from(tabla)
    .insert(p)
    .select()
    .maybeSingle()
    if (error) {
        throw new Error(error.message);
    }
    if (file) {
        const nuevo_id = data?.id
    }
}
const subirArchivo = async() => {
    const ruta = "publicaciones/"+id
    const {} = await supabase.storage.from("archivos")
}

export const usePostStore = create((set) => ({
    file: null, 
        setFile: (p) => set({ file: p }),
        stateImage: false, 
        setStateImage: () => {
            set((state) => ({ stateImage: !state.stateImage }))
        }, 
        stateForm: false, 
        setStateForm: () => {
            set((state) => ({ stateForm: !state.stateForm }))
        }
}))