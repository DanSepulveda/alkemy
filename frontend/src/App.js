import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Login from './views/Login'
import Home from './views/Home'
import userActions from './utils/usersActions'

const App = () => {
  const [user, setUser] = useState({
    id: null,
    username: null,
    email: null,
    token: null
  })

  const tokenLogin = async (token) => {
    const response = await userActions.verifyToken(token)
    if (response.success) {
      response.response.token = token
      setUser(response.response)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) tokenLogin(token)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {user.token && <Route path='/' element={<Home user={user} setUser={setUser} />} />}
        {!user.token && <Route path='/login' element={<Login tag='login' setUser={setUser} />} />}
        {!user.token && <Route path='/signup' element={<Login tag='sign' setUser={setUser} />} />}
        <Route path='*' element={<Navigate to={user.token ? '/' : "/login"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App