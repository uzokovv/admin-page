import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CssVarsProvider } from '@mui/joy'
import { AuthProvider } from './context/useAuthContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CssVarsProvider>
  </StrictMode>,
)
