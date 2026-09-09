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
    <div>
      <h1>Health Prediction</h1>

      <p>
        Enter your health information to get an AI-powered prediction.
      </p>

      <form onSubmit={handlePredict}>
        <div>
          <label>Age</label>
          <br />

          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Gender</label>
          <br />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <br />

        <div>
          <label>BMI</label>
          <br />

          <input
            type="number"
            step="0.1"
            placeholder="Example: 22.5"
            value={bmi}
            onChange={(e) => setBmi(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Glucose Level</label>
          <br />

          <input
            type="number"
            step="0.1"
            placeholder="Example: 95"
            value={glucose}
            onChange={(e) => setGlucose(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Blood Pressure</label>
          <br />

          <input
            type="number"
            step="0.1"
            placeholder="Example: 120"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Get AI Prediction"}
        </button>
      </form>

      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div>
          <hr />

          <h2>AI Prediction Result</h2>

          <p>
            <strong>Predicted Disease:</strong>{" "}
            {result.predicted_disease}
          </p>

          <p>
            <strong>Confidence:</strong>{" "}
            {result.confidence}%
          </p>

          <p>
            <strong>Reason:</strong>{" "}
            {result.reason}
          </p>

          <p>
            <strong>Recommendation:</strong>{" "}
            {result.recommendation}
          </p>
        </div>
      )}
    </div>
  );
}

export default Predict;