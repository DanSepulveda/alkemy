import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Login from './views/Login'
import Home from './views/Home'

const App = () => {
  const [user, setUser] = useState({
    id: null,
    username: null,
    email: null,
    token: null
  })

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login tag='login' setUser={setUser} />} />
        <Route path='/signup' element={<Login setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App