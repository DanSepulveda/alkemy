import Navbar from '../components/Navbar'
import Resume from '../components/Resume'
import MainSection from '../components/MainSection'
import Transactions from '../components/Transactions'
import { useLocation } from 'react-router-dom'

const Records = () => {
    const path = useLocation().pathname

    return (
        <>
            <Navbar />
            <MainSection>
                {path === '/' ? <Resume /> : <Transactions />}
            </MainSection>
        </>
    )
}

export default Records