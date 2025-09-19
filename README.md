# Divino Desmadre

Red social desarrollada con **React + Vite + Supabase**, pensada para compartir publicaciones, comentarios y respuestas en **tiempo real**.

 Proyecto desplegado en: [https://divinodesmadre-1.web.app/](https://divinodesmadre-1.web.app/)

---

## Descripción

Divino Desmadre es una aplicación tipo red social que permite:

- Publicar contenido con texto e imagen/video.
- Comentar publicaciones y responder comentarios.
- Visualizar publicaciones en **tiempo real** gracias a suscripciones de Supabase.
- Autenticación de usuario y manejo de perfiles básicos.
- Interfaz moderna con soporte de **dark mode** y notificaciones.

---

## Características principales

- Crear publicaciones con texto e imágenes/videos  
- Comentar y responder publicaciones  
- Actualización en tiempo real con Supabase + React Query  
- Scroll infinito para cargar más publicaciones  
- Gestión de estado global con Zustand  
- Feedback visual: *spinners, toasts, emoji picker*  
- Modo oscuro / claro  

---

## Tecnologías utilizadas

| Componente | Tecnología |
|------------|------------|
| **Framework** | React + Vite |
| **Backend / BBDD** | Supabase (Postgres + Storage) |
| **Estado global** | Zustand |
| **Data Fetching** | React Query |
| **UI** | TailwindCSS, componentes personalizados |
| **Notificaciones** | Sonner |
| **Emojis** | emoji-picker-react |
| **Hosting** | Firebase Hosting |

---

## Estructura del proyecto

/
├── public/ → Archivos estáticos
├── src/
│ ├── components/ → Componentes UI (cards, input, modales, etc.)
│ ├── hooks/ → Hooks personalizados (formato fecha, subscripciones, etc.)
│ ├── stack/ → React Query (queries/mutations de posts y comentarios)
│ ├── store/ → Zustand stores (usuarios, posts, comentarios)
│ ├── pages/ → Páginas principales (HomePage, etc.)
│ ├── ui/ → Componentes auxiliares (spinners, botones, etc.)
│ └── supabase/ → Configuración del cliente de Supabase
├── .firebaserc → Config Firebase Hosting
├── firebase.json → Config Firebase
├── vite.config.js → Configuración Vite
├── package.json → Dependencias y scripts
└── README.md → Documentación

---

## Autor

Proyecto desarrollado por **Emilio Zdenko Abarca Cruz**  

- [GitHub](https://github.com/zdenc0de)  
- [LinkedIn](https://www.linkedin.com/in/zdenko-abarca-209050355/)  

