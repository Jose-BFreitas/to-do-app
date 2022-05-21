import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/todo");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };
  return (
    <div>
      Register
      <form onSubmit={handleSubmit}>
        <input
          placeholder='email'
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          placeholder='password'
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
