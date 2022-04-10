import { useEffect } from 'react'
import transactionsActions from '../utils/transactionsActions'

const Resume = ({ user }) => {
    useEffect(() => {
        const response = transactionsActions.getResume(user.token)
    }, [])
    return (
        <section>inicio</section>
    )
}

export default Resume