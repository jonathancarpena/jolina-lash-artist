
// Components
import Hero from '../components/Home/Hero'
import Credentials from '../components/Home/Credentials'
import Services from '../components/Home/Services'
import Reviews from '../components/Home/Reviews';


function Home() {


  return (
    <div className=''>

      <Hero />

      {/* Credentials */}
      <Credentials />

      {/* Services */}
      <Services />

      {/* Reviews */}
      <Reviews />



    </div>
  )
}

export default Home;
