import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await api.post("/signup", {
        full_name: fullName,
        email: email,
        password: password,
      });

      setMessage("Account created successfully!");

      console.log(response.data);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Signup failed. Please try again."
      );
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      <p>Sign up for MediPredict AI.</p>

      <form onSubmit={handleSignup}>
        <div>
          <label>Full Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Create Account</button>
      </form>

      {message && <p>{message}</p>}

      {error && <p>{error}</p>}
    </div>
  );
}

export default Signup;