import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { MyRoutes } from './routers/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useThemeStore } from './store/ThemeStore'
import { initializeAuth } from './store/AuthStore' 
import { useEffect } from 'react' 

//QueryClient fuera del componente
const queryClient = new QueryClient()

function App() {
  const { theme } = useThemeStore();

  // Inicializa auth una sola vez
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <QueryClientProvider 
      client={queryClient}>
        <MyRoutes />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
  
export default App
