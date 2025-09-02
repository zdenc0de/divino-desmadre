import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { MyRoutes } from './routers/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useThemeStore } from './store/ThemeStore'

function App() {
  const { theme } = useThemeStore();
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider 
      client={queryClient}>
        <MyRoutes />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
  
export default App
