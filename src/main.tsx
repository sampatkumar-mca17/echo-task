import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import { Routes } from './route-config'
import TodoProvider from './contexts/TodoProvider.tsx'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/ui/theme-provider.tsx'
const queryClient= new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme='light'>
      <TodoProvider>
          <RouterProvider router={Routes}/>
          <Toaster theme='system'/>
      </TodoProvider>
    </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
