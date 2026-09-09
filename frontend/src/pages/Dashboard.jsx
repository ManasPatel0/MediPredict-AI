import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await api.get("/me");
        setUser(response.data);
      } catch (err) {
        setError("Unable to load user information.");
        console.error(err);
      }
    };

    getUserData();
  }, []);

  if (error) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Loading user information...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user.full_name}! 👋</h1>

      <p>Welcome to your MediPredict AI Dashboard.</p>

      <hr />

      <h3>Your Profile</h3>

      <p>
        <strong>Name:</strong> {user.full_name}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>User ID:</strong> {user.id}
      </p>

      <hr />

      <h3>Healthcare Services</h3>

      <p>🤖 AI-powered health predictions</p>
      <p>📊 View your prediction history</p>
      <p>🔒 Secure healthcare data access</p>
    </div>
  );
}

export default Dashboard;