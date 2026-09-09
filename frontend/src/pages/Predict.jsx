import { useState } from "react";
import api from "../services/api";

function Predict() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [bmi, setBmi] = useState("");
  const [glucose, setGlucose] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await api.post("/predict", {
        age: Number(age),
        gender: gender,
        bmi: Number(bmi),
        glucose: Number(glucose),
        blood_pressure: Number(bloodPressure),
      });

      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Prediction failed. Please try again."
      );

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="predict-page">

      {/* Header */}
      <section className="predict-header">
        <div>
          <span className="dashboard-label">
            MEDIPREDICT AI
          </span>

          <h1>AI Health Prediction</h1>

          <p>
            Enter your health information to receive an
            AI-powered predictive health insight.
          </p>
        </div>

        <div className="predict-header-icon">
          🤖
        </div>
      </section>

      <div className="predict-layout">

        {/* Input Card */}
        <div className="predict-card">

          <div className="predict-card-header">
            <div>
              <span className="card-label">PATIENT INFORMATION</span>
              <h2>Health Details</h2>
            </div>

            <div className="card-icon">🩺</div>
          </div>

          <form
            className="predict-form"
            onSubmit={handlePredict}
          >

            {/* Age */}
            <div className="form-group">
              <label htmlFor="age">Age</label>

              <input
                id="age"
                type="number"
                min="1"
                max="120"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />

              <small>Age in years</small>
            </div>

            {/* Gender */}
            <div className="form-group">
              <label htmlFor="gender">Gender</label>

              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <small>Select your gender</small>
            </div>

            {/* BMI */}
            <div className="form-group">
              <label htmlFor="bmi">BMI</label>

              <input
                id="bmi"
                type="number"
                step="0.1"
                min="1"
                max="100"
                placeholder="Example: 22.5"
                value={bmi}
                onChange={(e) => setBmi(e.target.value)}
                required
              />

              <small>Body Mass Index</small>
            </div>

            {/* Glucose */}
            <div className="form-group">
              <label htmlFor="glucose">
                Glucose Level
              </label>

              <input
                id="glucose"
                type="number"
                step="0.1"
                min="1"
                placeholder="Example: 95"
                value={glucose}
                onChange={(e) => setGlucose(e.target.value)}
                required
              />

              <small>Blood glucose level</small>
            </div>

            {/* Blood Pressure */}
            <div className="form-group">
              <label htmlFor="bloodPressure">
                Blood Pressure
              </label>

              <input
                id="bloodPressure"
                type="number"
                step="0.1"
                min="1"
                placeholder="Example: 120"
                value={bloodPressure}
                onChange={(e) =>
                  setBloodPressure(e.target.value)
                }
                required
              />

              <small>Systolic blood pressure</small>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="predict-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  Analyzing Health Data...
                </>
              ) : (
                <>
                  🤖 Get AI Prediction
                </>
              )}
            </button>

          </form>

          <div className="prediction-disclaimer">
            <span>ⓘ</span>

            <p>
              This AI prediction is for informational purposes
              only and should not replace professional medical
              advice.
            </p>
          </div>

        </div>

        {/* Result Card */}
        <div className="result-card">

          {!result ? (
            <div className="result-empty">

              <div className="result-empty-icon">
                📊
              </div>

              <h2>Prediction Result</h2>

              <p>
                Submit your health information to see your
                AI-powered prediction here.
              </p>

              <div className="result-features">
                <div>
                  <span>✓</span>
                  AI-powered analysis
                </div>

                <div>
                  <span>✓</span>
                  Confidence score
                </div>

                <div>
                  <span>✓</span>
                  Personalized recommendation
                </div>
              </div>

            </div>
          ) : (
            <div className="result-content">

              <div className="result-title">
                <div>
                  <span className="card-label">
                    AI ANALYSIS
                  </span>

                  <h2>Prediction Result</h2>
                </div>

                <div className="result-check">
                  ✓
                </div>
              </div>

              <div className="prediction-result-box">

                <span>Predicted Condition</span>

                <h3>
                  {result.predicted_disease || "No Disease Detected"}
                </h3>

              </div>

              <div className="confidence-section">

                <div className="confidence-header">
                  <span>AI Confidence</span>

                  <strong>
                    {result.confidence}%
                  </strong>
                </div>

                <div className="confidence-bar">
                  <div
                    className="confidence-fill"
                    style={{
                      width: `${result.confidence}%`,
                    }}
                  ></div>
                </div>

              </div>

              <div className="result-detail">

                <div className="detail-icon">
                  💡
                </div>

                <div>
                  <h4>Analysis</h4>

                  <p>
                    {result.reason ||
                      "The AI system analyzed the provided health information."}
                  </p>
                </div>

              </div>

              <div className="result-detail">

                <div className="detail-icon">
                  🩺
                </div>

                <div>
                  <h4>Recommendation</h4>

                  <p>
                    {result.recommendation ||
                      "Please consult a qualified healthcare professional for further guidance."}
                  </p>
                </div>

              </div>

              <div className="prediction-saved">
                ✓ Prediction saved to your history
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Predict;