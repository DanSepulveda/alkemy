import Navbar from '../components/Navbar'
import MainSection from '../components/MainSection'
import Transactions from '../components/Transactions'

const Details = () => {
    return (
        <>
            <Navbar />
            <MainSection>
                <Transactions />
            </MainSection>
        </>
    )
}

export default Details