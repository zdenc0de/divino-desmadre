import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

export const useAuthStore = create((set) => ({
    crearUserYLogin: async (p) => {
        const {data} = await supabase.auth.signUp({
            credenciales:null, 
            setCredenciales : () => set({credenciales: p}),
            email: "",
            password: ""
        })
    }
}))