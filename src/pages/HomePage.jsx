import { HeaderSticky } from "../components/HomePageComponents/HeaderSticky";
import { InputPublicar } from "../components/HomePageComponents/InputPublicar";

export const HomePage = () => {
  return (
    <main 
    className="flex min-h-screen bg-white dark:bg-bg-dark max-w-[1200px] mx-auto">
      <section 
      className="flex flex-col w-full h-screen">
        <article 
        className="flex flex-col h-screen overflow-hidden border border-gray-200 dark:border-gray-600 border-t-0 border-b-0">
          <HeaderSticky />
          <div
          className="overflow-y-auto">
            <InputPublicar />
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
