import Navbar from '../components/Navbar'
import Resume from '../components/Resume'
import MainSection from '../components/MainSection'

const Home = ({ user, setUser }) => {
    return (
        <>
            <Navbar user={user} setUser={setUser} />
            <MainSection>
                <Resume user={user} />
            </MainSection>
        </>
    )
}

export default Home