import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import NavBox from './NavBox'

const Navbar = ({ user, setUser }) => {
    const [open, setOpen] = useState(false)

    return (
        <header>
            <nav>
                <NavLink to='/'>Inicio</NavLink>
                <NavLink to='/details'>Transacciones</NavLink>
            </nav>
            <div className='flex-cc'>
                <span className='greeting'>{`Bienvenido, ${user.username}`}</span>
                <i className='fas fa-user-circle' onClick={() => setOpen(!open)}></i>
            </div>
            {open && <NavBox user={user} setUser={setUser} />}
        </header>
    )
}

export default Navbar