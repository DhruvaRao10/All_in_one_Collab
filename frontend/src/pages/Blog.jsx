import React from "react";
import Bloglist from "../components/Bloglist";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function Blog() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col justify-center">
        <Search />
        <Bloglist />
        <div className=" mx-auto mb-4 w-20 ">
          <Link to="/createblog">
            <Button Status="Create blog" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Blog;
