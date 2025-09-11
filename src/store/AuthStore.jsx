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
    },
    cerrarSesion: async () => {
        await supabase.auth.signOut();
    }, 
}));

export const useSubscription = create((set) => ({
    user: null, 
    loading: true,
    setUser: (user) => set({user}),
    setLoading: (loading) => set({loading})
}));

// 👈 Función de inicialización separada
let isInitialized = false;

export const initializeAuth = () => {
    if (isInitialized) return;
    isInitialized = true;
    
    const { setUser, setLoading } = useSubscription.getState();
    
    supabase.auth.getSession().then(({data:{session}}) => {
        if (session?.user) {
            setUser(session.user);
            setLoading(false);
            console.log("Usuario en sesión:", session.user);
        } else {
            setUser(null);
            setLoading(false);
        }
    });
    
    supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
            setUser(session.user);
            setLoading(false);
            console.log("Usuario en sesión:", session.user);
        } else {
            setUser(null);
            setLoading(false);
        }
    });
};