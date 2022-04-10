import Navbar from "../components/Navbar"

const Home = ({ user, setUser }) => {
    return (
        <section className="main">
            <Navbar user={user} setUser={setUser} />
        </section>
    )
}

export default Home