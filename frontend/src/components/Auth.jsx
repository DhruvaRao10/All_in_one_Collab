import Cards from "./Cards";
import styles from "./Auth.module.css";
import Login from "./Login";
import Button from "./Button";
import Register from "./Register";
import { useState } from "react";
function Auth() {
  const [toggle, setToggle] = useState(0);
  return (
    <div className="item-center justify-center">
      <div className={styles.card}>
        <div className="flex justify-center">
          <button
            className="btn glass mr-2"
            onClick={() => setToggle(0)}
            disabled={toggle === 0}
          >
            Register
          </button>
          <button
            className="btn glass"
            onClick={() => setToggle(1)}
            disabled={toggle === 1}
          >
            Login
          </button>
        </div>
        {toggle === 0 ? <Register /> : <Login />}
      </div>
    </div>
  );
}

export default Auth;
// import React, { useState } from "react";
// import styles from "./Auth.module.css";
// import Login from "./Login";
// import Register from "./Register";

// function Auth() {
//   const [toggle, setToggle] = useState(0);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className={styles.card}>
//         <div className="flex justify-center mb-4">
//           <button
//             className="btn glass mr-2"
//             onClick={() => setToggle(0)}
//             disabled={toggle === 0}
//           >
//             Register
//           </button>
//           <button
//             className="btn glass"
//             onClick={() => setToggle(1)}
//             disabled={toggle === 1}
//           >
//             Login
//           </button>
//         </div>
//         {toggle === 0 ? <Register /> : <Login />}
//       </div>
//     </div>
//   );
// }

// export default Auth;
