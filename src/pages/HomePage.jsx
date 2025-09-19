import { HeaderSticky } from "../components/HomePageComponents/HeaderSticky";
import { InputPublicar } from "../components/HomePageComponents/InputPublicar";
import { PublicacionCard } from "../components/HomePageComponents/PublicacionCard";
import { FormPost } from "../components/Forms/FormPost";
import { usePostStore } from "../store/PostStore";
import { Toaster } from "sonner";
import { useMostrarPostQuery } from "../stack/PostStack";
import { useEffect, useRef } from "react";
import { SpinnerLocal } from "../components/ui/spinners/SpinnerLocal";
import { useSupabaseSubscription } from "../hooks/useSupabaseSubscription";
import { ComentarioModal } from "../components/HomePageComponents/ComentarioModal";
import { useComentariosStore } from "../store/ComentariosStore";
import { useMostrarRespuestaComentariosQuery } from "../stack/RepuestasComentariosStack";
import { FormActualizarPerfil } from "../components/Forms/FormActualizarPerfil";
import { useUsuariosStore } from "../store/UsuariosStore";
import { data } from "react-router-dom";

export const HomePage = () => {
  const {dataUsuarioAuth} = useUsuariosStore();
  const {stateForm, setStateForm, itemSelect} = usePostStore();
  const {data:dataPost, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading:isLoadingPost} = useMostrarPostQuery();
  const {showModal} = useComentariosStore();
  const {data: dataRespuestaComentario} = useMostrarRespuestaComentariosQuery();

  const scrollRef = useRef(null);
  
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return; 
    
    const handleScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 200 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
    
    el.addEventListener("scroll", handleScroll);
    
    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Subscripción para posts
  useSupabaseSubscription({
    channelName: "public:publicaciones", 
    options: {event: "*", schema: "public", table: "publicaciones"}, 
    queryKey: ["mostrar post"]
  });

  // Subscripción para comentarios - CORREGIDO
  useSupabaseSubscription({
    channelName: "public:comentarios", 
    options: {event: "*", schema: "public", table: "comentarios"}, 
    queryKey: ["mostrar comentarios", "comentarios"] // Múltiples keys para invalidar
  });

  useSupabaseSubscription({
    channelName: "public:respuestas_comentarios", 
    options: {event: "*", schema: "public", table: "respuestas_comentarios"}, 
    queryKey: [
      "mostrar respuesta comentarios", 
      "respuestas comentarios",
      "comentarios" // También invalida comentarios para actualizar contador
    ]
  });

  return (
    <main className="flex min-h-screen bg-white dark:bg-bg-dark max-w-[1200px] mx-auto">
      {
        dataUsuarioAuth?.foto_perfil === "-" && <FormActualizarPerfil />
      }
      <Toaster position="top-left"/>
      {stateForm && <FormPost />}
      
      <section className="flex flex-col w-full h-screen">
        <article className="flex flex-col h-screen overflow-hidden border border-gray-200 dark:border-gray-600 border-t-0 border-b-0">
          <HeaderSticky />
          <div
            ref={scrollRef}
            className="overflow-y-auto"
          >
            <InputPublicar />
            {dataPost?.pages?.map((page, pageIndex) => 
              page?.map((item, index) => 
                <PublicacionCard 
                  key={`${pageIndex}-${index}`} 
                  item={item} 
                />
              ) 
            )}
            {isFetchingNextPage && <SpinnerLocal />}
          </div>
        </article>
        
        <article className="border border-gray-200 dark:border-gray-600 border-t-0 border-b-0">
          Sidebar derecho
        </article>
      </section>
      
      {showModal && <ComentarioModal />}
    </main>
  );
};