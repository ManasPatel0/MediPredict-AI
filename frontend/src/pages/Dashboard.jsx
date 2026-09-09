import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      <div className="dashboard-page">
        <div className="dashboard-error">
          <h2>Dashboard</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <div className="loading-icon">✚</div>
          <h2>Loading Dashboard...</h2>
          <p>Please wait while we load your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Dashboard Header */}
      <section className="dashboard-header">
        <div>
          <span className="dashboard-label">
            MEDIPREDICT AI
          </span>

          <h1>
            Welcome, {user.full_name}! 👋
          </h1>

          <p>
            Manage your health predictions and healthcare insights
            from your dashboard.
          </p>
        </div>

        <div className="user-avatar">
          {user.full_name?.charAt(0).toUpperCase()}
        </div>
      </section>

      {/* Stats */}
      <section className="dashboard-stats">

        <div className="stat-card">
          <div className="stat-icon">🤖</div>

          <div>
            <h3>AI Predictions</h3>
            <p>Health analysis powered by AI</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>

          <div>
            <h3>Prediction History</h3>
            <p>Review your previous results</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔒</div>

          <div>
            <h3>Secure Account</h3>
            <p>Your data is protected</p>
          </div>
        </div>

      </section>

      {/* Main Dashboard Grid */}
      <section className="dashboard-grid">

        {/* Profile Card */}
        <div className="dashboard-card profile-card">

          <div className="card-header">
            <div>
              <span className="card-label">ACCOUNT</span>
              <h2>Your Profile</h2>
            </div>

            <div className="card-icon">👤</div>
          </div>

          <div className="profile-details">

            <div className="profile-item">
              <span>Name</span>
              <strong>{user.full_name}</strong>
            </div>

            <div className="profile-item">
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>

            <div className="profile-item">
              <span>User ID</span>
              <strong>#{user.id}</strong>
            </div>

          </div>

        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">

          <div className="card-header">
            <div>
              <span className="card-label">SERVICES</span>
              <h2>Quick Actions</h2>
            </div>

            <div className="card-icon">⚡</div>
          </div>

          <div className="quick-actions">

            <Link to="/predict" className="action-btn primary-action">
              <span>🤖</span>

              <div>
                <strong>New Prediction</strong>
                <small>Analyze health information</small>
              </div>

              <span className="action-arrow">→</span>
            </Link>

            <Link to="/history" className="action-btn">
              <span>📊</span>

              <div>
                <strong>View History</strong>
                <small>Check previous predictions</small>
              </div>

              <span className="action-arrow">→</span>
            </Link>

          </div>

        </div>

      </section>

      {/* Information Section */}
      <section className="dashboard-info">

        <div className="info-icon">💡</div>

        <div>
          <h3>How MediPredict AI Works</h3>

          <p>
            Enter your health information and our AI system will
            analyze the provided data to generate predictive
            healthcare insights.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Dashboard;