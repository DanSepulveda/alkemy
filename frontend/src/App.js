import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Login from './views/Login'
import Records from './views/Records'
import { connect } from 'react-redux'
import userActions from './redux/actions/usersActions'

const App = ({ token, verifyToken }) => {
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) verifyToken(token)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {token && <Route path='/' element={<Records />} />}
        {token && <Route path='/details' element={<Records />} />}
        {!token && <Route path='/login' element={<Login />} />}
        {!token && <Route path='/signup' element={<Login />} />}
        <Route path='*' element={<Navigate to={token ? '/' : "/login"} />} />
      </Routes>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
  }
}

const mapDispatchToProps = {
  verifyToken: userActions.verifyToken
}

export default connect(mapStateToProps, mapDispatchToProps)(App)