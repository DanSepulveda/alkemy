import { Fragment } from 'react'
import Navbar from '../components/Navbar'
import Resume from '../components/Resume'
import MainSection from '../components/MainSection'
import Transactions from '../components/Transactions'
import { useLocation } from 'react-router-dom'

const Records = () => {
    const path = useLocation().pathname

    const component = path === '/'
        ? <Resume />
        : <Transactions />

    return (
        <Fragment>
            <Navbar />
            <MainSection>
                {component}
            </MainSection>
        </Fragment>
    )
}

export default Records