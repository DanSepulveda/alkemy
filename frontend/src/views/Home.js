import Navbar from '../components/Navbar'
import Resume from '../components/Resume'
import MainSection from '../components/MainSection'

const Home = () => {
    return (
        <>
            <Navbar />
            <MainSection>
                <Resume />
            </MainSection>
        </>
    )
}

export default Home