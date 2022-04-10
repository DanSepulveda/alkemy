import { useState } from "react"
import NavBox from "./NavBox"

const Navbar = ({ user, setUser }) => {
    const [open, setOpen] = useState(false)

    return (
        <header>
            <nav>hola</nav>
            <i className="fas fa-user-circle" onClick={() => setOpen(!open)}></i>
            {open && <NavBox user={user} setUser={setUser} />}
        </header>
    )
}

export default Navbar