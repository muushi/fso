import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ContextWrapper } from './components/NotificationContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextWrapper>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ContextWrapper>
)
