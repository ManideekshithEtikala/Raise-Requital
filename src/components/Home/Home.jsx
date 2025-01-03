import BuinessModel from './BuinessModel';
import Head from './Head'
import { Navbar } from './Navbar'
import mainImage from "/Users/manideekshith/Desktop/Manideekshith/MERN stack projects/RaiseRequital/frontend/raiserequital/src/assets/mainimage.png";
const Home = () => {
  return (
        <>
    <div style={{backgroundImage:`url(${mainImage})`}}>
        <Navbar/>
        <Head/>
    </div>
    <BuinessModel/>
    </>
  )
}

export default Home