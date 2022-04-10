import Navbar from "../components/Navbar"
import Resume from '../components/Resume'

const Home = ({ user, setUser }) => {
    return (
        <section className="main">
            <Navbar user={user} setUser={setUser} />
            <Resume user={user} />
        </section>
    )
}

export default Home