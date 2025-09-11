import { HeaderSticky } from "../components/HomePageComponents/HeaderSticky";
import { InputPublicar } from "../components/HomePageComponents/InputPublicar";
import { PublicacionCard } from "../components/HomePageComponents/PublicacionCard";
import { FormPost } from "../components/Forms/FormPost";
import { usePostStore } from "../store/PostStore";
import { Toaster } from "sonner";
import { useMostrarPostQuery } from "../stack/PostStack";
import { useEffect, useRef } from "react";

export const HomePage = () => {
  const {stateForm} = usePostStore();
  const {data:dataPost, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading:isLoadingPost} = useMostrarPostQuery()
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    const handleScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 200 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
    }
  }
  if(el) {
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }
  }, [
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage
  ])
  return (
    <main 
    className="flex min-h-screen bg-white dark:bg-bg-dark max-w-[1200px] mx-auto">
      <Toaster position = "top-left"/>
      {
        stateForm && <FormPost />
      }
      <section 
      className="flex flex-col w-full h-screen">
        <article 
        className="flex flex-col h-screen overflow-hidden border border-gray-200 dark:border-gray-600 border-t-0 border-b-0">
          <HeaderSticky />
          <div
          ref={scrollRef}
          className="overflow-y-auto">
            <InputPublicar />
            {dataPost?.pages?.map((page, pageIndex) => 
              page?.map((item, index) => <PublicacionCard key={`${pageIndex}-${index}`} item={item} />) 
            )}
          </div>
        </article>
        <article 
        className="border border-gray-200 dark:border-gray-600 border-t-0 border-b-0">
          Sidebar derecho
        </article>
      </section>
    </main>
  );
};
