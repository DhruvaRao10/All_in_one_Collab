import React, { useState, useEffect } from "react";
import axios from "axios";
const Createblog = () => {
  const [formData, setFormData] = useState({
    title: "",
    snippet: "",
    body: "",
    imageFile: "",
    videoFile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const { title, snippet, body, imageFile, videoFile } = formData;
    const userData = { title, snippet, body, imageFile, videoFile }; // Add role field
    const res = await axios.post("http://localhost:8000/blog/create", userData);
    try {
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message, { className: "toast-success" }); // Add className for green color
        form.reset();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Check Email and Name its already exist");
      }
    }
    if (res.data.message === "Email is already registered") {
      toast.error("Email is already registered. Please use another email.");
    }
    if (res.data.message === "Name is already registered") {
      toast.error("Name is already registered. Please use another name.");
    }
  };
  async function uploadImage() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully.");
      } else {
        console.error("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <nav>
        <div className="site-title">
          <a href="/">
            <h1>Blog Ninja</h1>
          </a>
          <p>A Ninja site</p>
        </div>
        <ul>
          <li>
            <a href="/blogs">Blogs</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/blog/create">New Blog</a>
          </li>
        </ul>
      </nav>

      <div
        className="create-blog content"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <form onSubmit={handleOnSubmit}>
          <label htmlFor="title">Blog title:</label>
          <input
            type="text"
            className="input input-bordered input-sm w-full max-w-xs"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="snippet">Blog snippet:</label>
          <input
            type="text"
            className="input input-bordered input-sm w-full max-w-xs"
            id="snippet"
            name="snippet"
            value={formData.snippet}
            onChange={handleChange}
            required
          />

          <label htmlFor="body">Blog body:</label>
          <textarea
            className="fr-view"
            id="body"
            name="body"
            style={{ height: "120px", borderRadius: "8px" }}
            value={formData.body}
            onChange={handleChange}
            required
          ></textarea>

          <label htmlFor="imageFile">Attach Image:</label>
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            name="imageFile"
            id="imageFile"
            style={{ padding: "0" }}
            value={formData.imageFile}
            onChange={handleChange}
          />

          <label htmlFor="videoFile">Attach Video:</label>
          <input
            type="file"
            className="file-input file-input-bordered file-input-accent w-full max-w-xs"
            name="videoFile"
            id="videoFile"
            style={{ padding: "0" }}
            value={formData.videoFile}
            onChange={handleChange}
          />

          <button
            className="btn glass"
            type="submit"
            style={{
              marginTop: "20px",
              background: "crimson",
              color: "white",
              padding: "6px",
              border: "0",
              fontSize: "1.2em",
              cursor: "pointer",
            }}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
};

export default Createblog;
