import { CssVarsProvider } from '@mui/joy'
import Home from './pages/home'

const App = () => {
  return (
    <div>
      <CssVarsProvider>
      <Home />
    </CssVarsProvider>
    </div>
  )
}

export default App