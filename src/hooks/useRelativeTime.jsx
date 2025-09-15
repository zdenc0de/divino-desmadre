import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import 'dayjs/locale/es';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('es');

dayjs.updateLocale('es', {
    relativeTime: {
        future: "en %s",
        past: "hace %s",
        s: "unos segundos",
        m: "un minuto",
        mm: "%d minutos",
        h: "una hora",
        hh: "%d horas",
        d: "un día",
        dd: "%d días",
        M: "un mes",
        MM: "%d meses",
        y: "un año",
        yy: "%d años"
    }, 
});

export function useRelativeTime(data) {
    if (!data) return "Fecha no disponible";
    
    try {
        // Para timestamp sin timezone de Supabase, tratar como fecha local
        const fechaComentario = dayjs(data);
        
        return fechaComentario.fromNow();
    } catch (error) {
        console.error("Error al procesar fecha:", error);
        return "Fecha inválida";
}
}