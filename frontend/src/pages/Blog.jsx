import React from "react";
import Bloglist from "../components/Bloglist";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Search from "../components/Search";

function Blog() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col justify-center">
        <Search />
        <Bloglist />
      </div>
      <Footer />
    </div>
  );
}

export default Blog;
