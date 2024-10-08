import React, { useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, setUser } = useUserContext();
  console.log(user);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/user/get-user",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setUser(res.data.data);
      } else {
        navigate("/login");
        localStorage.clear();
      }
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, setUser, navigate]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
