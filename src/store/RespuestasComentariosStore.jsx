import { supabase } from "../supabase/supabase.config";
import { create } from "zustand";

const tabla = "respuestas_comentarios";

export const useRespuestasComentariosStore = create((set, get) => ({
    respuesta: "", 
    setRespuesta: (p) => set({ respuesta: p }),
    respuestaActivaParaComentarioId: null,
    setRespuestaActiva: (p) => set({
        respuestaActivaParaComentarioId: p 
    }), 
    limpiarRespuestaActiva: () => set({ 
        respuestaActivaParaComentarioId: null 
    }), 
    
    insertarRespuestaAComentario: async (p) => {
        try {
            const { data, error } = await supabase
                .from(tabla)
                .insert(p)
                .select();
                
            if (error) throw new Error(error.message);
            
            return data;
        } catch (error) {
            console.error("Error en insertarRespuestaAComentario:", error);
            throw error;
        }
    }, 
    dataRespuestaAComentario: null, 
    
    mostrarRespuestaAComentario: async (p) => {
        try {
            const { data, error } = await supabase
                .from(tabla)
                .select(`*, usuarios(*)`)
                .eq("id_comentario", p.id_comentario);
                
            if (error) {
                throw new Error(error.message);
            }
            set({ dataRespuestaAComentario: data });
            return data;
        } catch (error) {
            console.error("Error en mostrarRespuestaAComentario:", error);
            throw error;
        }
    },
}));