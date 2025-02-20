// import { CssVarsProvider } from '@mui/joy'
// import Home from './pages/home'
import LoginFinal from './pages/auth/login'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
      <LoginFinal />
      <ToastContainer />
    </div>
  )
}

export default App