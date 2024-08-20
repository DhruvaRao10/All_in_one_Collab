import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Auth from "../components/Auth";
import GlobeBackground from "../components/GlobeBackground";
function Homepage() {
  return (
    <>
      {/* <GlobeBackground /> */}
      <Navbar />
      <Auth initialMode="register" />
      <Footer />
    </>
  ); 
}

export default Homepage;
