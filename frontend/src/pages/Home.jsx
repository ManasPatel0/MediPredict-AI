import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>AI-Powered Healthcare Predictions</h1>

          <p>
            MediPredict AI helps users analyze health information and get
            AI-powered predictive insights quickly and securely.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="primary-btn">
              Get Started
            </Link>

            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose MediPredict AI?</h2>

        <div className="feature-container">
          <div className="feature-card">
            <h3>🤖 AI Predictions</h3>
            <p>
              Get intelligent health predictions based on patient health data.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔒 Secure Access</h3>
            <p>
              Your account and prediction history are protected with secure
              authentication.
            </p>
          </div>

          <div className="feature-card">
            <h3>📊 Prediction History</h3>
            <p>
              Access and review your previous health predictions anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;