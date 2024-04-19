import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <Cards />
        <Cards />
        <Cards />
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
