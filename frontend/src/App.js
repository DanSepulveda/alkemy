import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/Login'
import Home from './views/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login tag='login' />} />
        <Route path='/signup' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App