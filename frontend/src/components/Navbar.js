import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import NavBox from './NavBox'
import { connect } from 'react-redux'

const Navbar = ({ username }) => {
    const [open, setOpen] = useState(false)

    return (
        <header>
            <nav>
                <NavLink to='/'>Inicio</NavLink>
                <NavLink to='/details'>Transacciones</NavLink>
            </nav>
            <div className='flex-cc'>
                <span className='greeting'>{`Bienvenido, ${username}`}</span>
                <i className='fas fa-user-circle' onClick={() => setOpen(!open)}></i>
            </div>
            {open && <NavBox />}
        </header>
    )
}

const mapStateToProps = state => {
    return {
        username: state.users.username
    }
}

export default connect(mapStateToProps)(Navbar)