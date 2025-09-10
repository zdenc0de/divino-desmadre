import { useEffect, useState } from "react";

export function useFormattedDate() {
    const [formattedDate, setFormattedDate] = useState("")

    useEffect(() => {
        const fechaActual = new Date()
        
        // SOLUCIÓN 1: Formato ISO (RECOMENDADO para Supabase)
        const fechaISO = fechaActual.toISOString()
        setFormattedDate(fechaISO)
        
        // SOLUCIÓN 2: Si necesitas formato PostgreSQL específico con timezone local
        // const offset = fechaActual.getTimezoneOffset() * 60000
        // const fechaLocal = new Date(fechaActual - offset)
        //     .toISOString()  // <-- CAMBIO: usar toISOString() en lugar de toUTCString()
        //     .slice(0, 19)   // Tomar solo YYYY-MM-DDTHH:mm:ss
        //     .replace("T", " ") // Cambiar T por espacio: YYYY-MM-DD HH:mm:ss
        // setFormattedDate(fechaLocal)
        
    }, [])
    
    return formattedDate
}