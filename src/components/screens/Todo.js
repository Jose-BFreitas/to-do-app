import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Todo = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You're logged out");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div>
      <h3>Email:{user && user.email}</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Todo;
