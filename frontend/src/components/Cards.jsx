import { useNavigate } from "react-router-dom";
import styles from "./Cards.module.css";
// import React from "react";
import axios from "axios";
function Cards({ content }) {
  const navigate = useNavigate();
  const runLiveServer = async () => {
    try {
      await axios.post("http://localhost:8000/run-live-server");
      console.log("live-server started successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const runCodeeditor = () => {
    navigate("/codeeditor");
  };

  const runBlog = () => {
    navigate("/blog");
  };

  if (content === "blog") {
    return (
      <div className={styles.dashboard}>
        <div className={styles.card} onClick={runBlog}>
          <h2>Blog</h2>
          <p>Collaborate with a partner on coding tasks.</p>
        </div>
      </div>
    );
  } else if (content === "pair-programming") {
    return (
      <div className={styles.dashboard}>
        <div className={styles.card} onClick={runLiveServer}>
          <h2>Pair Programming</h2>
          <p>Collaborate with a partner on coding tasks.</p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.dashboard}>
      <div className={styles.card} onClick={runCodeeditor}>
        <h2>Code Editor</h2>
        <p>Collaborate with a partner on coding tasks.</p>
      </div>
    </div>
  );
}

export default Cards;
