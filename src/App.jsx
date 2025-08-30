import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider 
      client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
  
export default App
