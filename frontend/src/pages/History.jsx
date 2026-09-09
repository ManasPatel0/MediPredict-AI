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
      <div>
        <h1>Prediction History</h1>
        <p>Loading your predictions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Prediction History</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Prediction History</h1>

      {predictions.length === 0 ? (
        <p>No predictions found.</p>
      ) : (
        <div>
          <p>
            You have made {predictions.length} prediction
            {predictions.length !== 1 ? "s" : ""}.
          </p>

          {predictions.map((prediction) => (
            <div key={prediction.id}>
              <hr />

              <h3>
                Prediction #{prediction.id}
              </h3>

              <p>
                <strong>Age:</strong> {prediction.age}
              </p>

              <p>
                <strong>Gender:</strong> {prediction.gender}
              </p>

              <p>
                <strong>BMI:</strong> {prediction.bmi}
              </p>

              <p>
                <strong>Glucose:</strong> {prediction.glucose}
              </p>

              <p>
                <strong>Blood Pressure:</strong>{" "}
                {prediction.blood_pressure}
              </p>

              <p>
                <strong>Predicted Disease:</strong>{" "}
                {prediction.predicted_disease}
              </p>

              <p>
                <strong>Confidence:</strong>{" "}
                {prediction.confidence}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;