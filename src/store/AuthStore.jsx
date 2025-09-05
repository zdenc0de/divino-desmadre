import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import { data } from "react-router-dom";

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
    },
    cerrarSesion:async () => {
        await supabase.auth.signOut();
    }, 
}));

export const useSubscription = create((set) => {
    const store = {
        user: null, 
        loading: true, // Agregar estado de carga
        setUser: (user) => set({user}),
        setLoading: (loading) => set({loading})
    }
    
    // Listener que se ejecuta una vez cuando se importa el store
    supabase.auth.getSession().then(({data:{session}}) => {
        if (session?.user) {
            set({user: session.user, loading: false})
            console.log("Usuario en sesión:", session.user);
        } else {
            set({user: null, loading: false})
        }
    })
    
    supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
            set({user: session.user, loading: false})
            console.log("Usuario en sesión:", session.user);
        } else {
            set({user: null, loading: false})
        }
    })
    
    return store;
})