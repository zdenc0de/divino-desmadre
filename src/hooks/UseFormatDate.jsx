import { useEffect, useState } from "react";

export function useFormattedDate() {
    const [formattedDate, setFormattedDate] = useState("")

    useEffect(() => {
        const fechaActual = new Date()

        const offset = fechaActual.getTimezoneOffset() * 60000
        const fechaLocal = new Date(fechaActual - offset)
            .toUTCString()
            .slice(0, 19)
            .replace("T", " ")
        setFormattedDate(fechaLocal)
    }, [])
    return formattedDate
}