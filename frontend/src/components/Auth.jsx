import React, { useState } from "react";
import styles from "./Auth.module.css";
import Login from "./Login";
import Register from "./Register";

function Auth({ initialMode = "register" }) {
  const [mode, setMode] = useState(initialMode);

  return (
    <div className="item-center justify-center">
      <div className={styles.card}>
        <div className="flex justify-center">
          <button
            className="btn glass mr-2"
            onClick={() => setMode("register")}
            disabled={mode === "register"}
          >
            Register
          </button>
          <button
            className="btn glass"
            onClick={() => setMode("login")}
            disabled={mode === "login"}
          >
            Login
          </button>
        </div>
        {mode === "register" ? <Register /> : <Login />}
      </div>
    </div>
  );
}

export default Auth;


