import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <Cards content="blog" />
        <Cards content="pair-programming" />
        <Cards content="codeeditor" />
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
