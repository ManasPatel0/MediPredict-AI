import { useEffect, useState } from "react";
import api from "../services/api";

function History() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/history");
        setPredictions(response.data);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.detail ||
            "Unable to load prediction history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="history-page">
        <div className="history-loading">
          <div className="loading-icon">📊</div>
          <h2>Loading Prediction History...</h2>
          <p>Please wait while we retrieve your previous predictions.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-page">
        <div className="history-error">
          <div className="history-error-icon">!</div>

          <h2>Unable to Load History</h2>

          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">

      {/* Header */}
      <section className="history-header">
        <div>
          <span className="dashboard-label">
            MEDIPREDICT AI
          </span>

          <h1>Prediction History</h1>

          <p>
            Review your previous AI-powered healthcare
            predictions and health information.
          </p>
        </div>

        <div className="history-header-icon">
          📊
        </div>
      </section>

      {/* Summary */}
      <section className="history-summary">

        <div className="history-summary-card">
          <div className="summary-icon">
            📋
          </div>

          <div>
            <span>Total Predictions</span>
            <strong>{predictions.length}</strong>
          </div>
        </div>

        <div className="history-summary-card">
          <div className="summary-icon">
            🤖
          </div>

          <div>
            <span>AI Analysis</span>
            <strong>Enabled</strong>
          </div>
        </div>

        <div className="history-summary-card">
          <div className="summary-icon">
            🔒
          </div>

          <div>
            <span>Data Security</span>
            <strong>Protected</strong>
          </div>
        </div>

      </section>

      {/* Empty State */}
      {predictions.length === 0 ? (
        <div className="history-empty">

          <div className="history-empty-icon">
            📊
          </div>

          <h2>No Predictions Yet</h2>

          <p>
            You haven't made any health predictions yet.
            Start your first AI-powered health analysis to
            see your results here.
          </p>

        </div>
      ) : (
        <section className="history-list">

          <div className="history-list-header">
            <div>
              <span className="card-label">
                YOUR RECORDS
              </span>

              <h2>Previous Predictions</h2>
            </div>

            <span className="prediction-count">
              {predictions.length} record
              {predictions.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="history-cards">

            {predictions.map((prediction) => (
              <div
                className="history-card"
                key={prediction.id}
              >

                {/* Card Top */}
                <div className="history-card-top">

                  <div className="history-card-title">
                    <div className="prediction-number">
                      #{prediction.id}
                    </div>

                    <div>
                      <span>AI Prediction</span>

                      <h3>
                        {prediction.predicted_disease ||
                          "No Disease Detected"}
                      </h3>
                    </div>
                  </div>

                  <div className="confidence-badge">
                    {prediction.confidence}% Confidence
                  </div>

                </div>

                {/* Health Metrics */}
                <div className="health-metrics">

                  <div className="health-metric">
                    <span>Age</span>
                    <strong>{prediction.age}</strong>
                    <small>years</small>
                  </div>

                  <div className="health-metric">
                    <span>Gender</span>
                    <strong>{prediction.gender}</strong>
                  </div>

                  <div className="health-metric">
                    <span>BMI</span>
                    <strong>{prediction.bmi}</strong>
                  </div>

                  <div className="health-metric">
                    <span>Glucose</span>
                    <strong>{prediction.glucose}</strong>
                  </div>

                  <div className="health-metric">
                    <span>Blood Pressure</span>
                    <strong>{prediction.blood_pressure}</strong>
                  </div>

                </div>

                {/* Confidence */}
                <div className="history-confidence">

                  <div className="history-confidence-header">
                    <span>Prediction Confidence</span>

                    <strong>
                      {prediction.confidence}%
                    </strong>
                  </div>

                  <div className="history-confidence-bar">
                    <div
                      className="history-confidence-fill"
                      style={{
                        width: `${prediction.confidence}%`,
                      }}
                    ></div>
                  </div>

                </div>

                {/* Footer */}
                <div className="history-card-footer">
                  <span>
                    ✓ Prediction saved securely
                  </span>

                  <span>
                    Prediction #{prediction.id}
                  </span>
                </div>

              </div>
            ))}

          </div>

        </section>
      )}

    </div>
  );
}

export default History;