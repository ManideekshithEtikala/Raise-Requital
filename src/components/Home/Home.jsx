import BuinessModel from './BuinessModel';
import Companies from './Companies';
import Footer from './Footer';
import Head from './Head'
import { Navbar } from './Navbar'
import UserReviews from './UserReviews';
const Home = () => {
  return (
        <>
    <div >
        <Navbar/>
        <Head/>
    </div>
    <BuinessModel/>
    <UserReviews/>
    <Companies/>
    <Footer/>
    </>
  )
}

export default Home