import React, { useEffect } from "react";

const Createblog = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "node_modules/froala-editor/js/froala_editor.pkgd.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (typeof FroalaEditor !== "undefined") {
      const editor = new FroalaEditor("#body");
    }
  }, []);

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
        <form action="/blogs" method="POST" encType="multipart/form-data">
          <label htmlFor="title">Blog title:</label>
          <input
            type="text"
            className="input input-bordered input-sm w-full max-w-xs"
            id="title"
            name="title"
            required
          />

          <label htmlFor="snippet">Blog snippet:</label>
          <input
            type="text"
            className="input input-bordered input-sm w-full max-w-xs"
            id="snippet"
            name="snippet"
            required
          />

          <label htmlFor="body">Blog body:</label>
          <textarea
            className="fr-view"
            id="body"
            name="body"
            style={{ height: "120px", borderRadius: "8px" }}
            required
          ></textarea>

          <label htmlFor="imageFile">Attach Image:</label>
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            name="image"
            id="imageFile"
            style={{ padding: "0" }}
          />

          <label htmlFor="videoFile">Attach Video:</label>
          <input
            type="file"
            className="file-input file-input-bordered file-input-accent w-full max-w-xs"
            name="video"
            id="videoFile"
            style={{ padding: "0" }}
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
