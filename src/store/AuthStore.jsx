import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

export const useAuthStore = create((set) => ({
    // Estado
    credenciales: null,
    user: null,
    
    // Función para establecer credenciales
    setCredenciales: (credenciales) => set({ credenciales }),
    
    // Función para crear usuario y login
    crearUserYLogin: async (p) => {
        const { data } = await supabase.auth.signUp({
            email: p.email,
            password: p.password
        });
        
        if (data.user) {
            set({ user: data.user });
        }
        
        return data.user;
    }
}));