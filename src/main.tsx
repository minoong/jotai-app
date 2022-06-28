import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ReactQueryDevtools } from 'react-query/devtools'
import Providers from './toast/Providers'

const queryClient = new QueryClient({
 defaultOptions: {
  queries: {
   refetchOnWindowFocus: false,
  },
 },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
 <React.StrictMode>
  <HelmetProvider>
   <CookiesProvider>
    <BrowserRouter>
     <QueryClientProvider client={queryClient}>
      <Providers>
       <App />
      </Providers>
      <ReactQueryDevtools initialIsOpen />
     </QueryClientProvider>
    </BrowserRouter>
   </CookiesProvider>
  </HelmetProvider>
 </React.StrictMode>,
)
