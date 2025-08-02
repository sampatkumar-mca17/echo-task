import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import { Routes } from './route-config'
import TodoProvider from './contexts/TodoProvider.tsx'
import { Theme } from '@radix-ui/themes'
import { Toaster } from 'sonner'
const queryClient= new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Theme>
      <TodoProvider>
          <RouterProvider router={Routes}/>
          <Toaster/>
      </TodoProvider>
    </Theme>
    </QueryClientProvider>
  </StrictMode>,
)
