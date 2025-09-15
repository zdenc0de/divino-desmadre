import { useEffect, useState } from "react"

export function useFormattedDate() {
  const [formattedDate, setFormattedDate] = useState("")

  useEffect(() => {
    const fechaActual = new Date()

    // ajusta al timezone local y genera timestamp tipo PostgreSQL
    const offset = fechaActual.getTimezoneOffset() * 60000
    const fechaLocal = new Date(fechaActual - offset)
      .toISOString()
      .slice(0, 19)       // YYYY-MM-DDTHH:mm:ss
      .replace("T", " ")  // -> YYYY-MM-DD HH:mm:ss

    setFormattedDate(fechaLocal)
  }, [])

  return formattedDate
}