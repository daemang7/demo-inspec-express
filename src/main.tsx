import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [apiInfo, setApiInfo] = useState<any>(null);
  const [inspections, setInspections] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchApiInfo = async () => {
    try {
      const response = await fetch("/api");
      const data = await response.json();
      setApiInfo(data);
    } catch (error) {
      console.error("Error fetching API info:", error);
    }
  };

  const fetchInspections = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/inspections");
      const data = await response.json();
      setInspections(data);
    } catch (error) {
      console.error("Error fetching inspections:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const createSampleInspection = async () => {
    try {
      const sampleInspection = {
        inspectedBy: "John Doe",
        date: new Date().toISOString().split("T")[0],
        extinguisherId: "EXT-001",
        location: "Building A - Floor 1",
        pressure: "Normal",
        condition: "Good",
        description: "Sample inspection created via API",
      };

      const response = await fetch("/api/inspections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sampleInspection),
      });

      if (response.ok) {
        alert("Sample inspection created successfully!");
        fetchInspections();
      } else {
        alert("Failed to create sample inspection");
      }
    } catch (error) {
      console.error("Error creating inspection:", error);
    }
  };

  const createSampleUser = async () => {
    try {
      const sampleUser = {
        username: `user_${Date.now()}`,
        password: "password123",
      };

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sampleUser),
      });

      if (response.ok) {
        alert("Sample user created successfully!");
        fetchUsers();
      } else {
        alert("Failed to create sample user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    fetchApiInfo();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Demo Inspec Express API</h1>

      <div style={{ marginBottom: "20px" }}>
        {/* <h2>API Information</h2> */}
        {apiInfo && (
          <div style={{ backgroundColor: "#f5f5f5", padding: "15px", borderRadius: "5px" }}>
            {/* <h3>
              {apiInfo.name} v{apiInfo.version}
            </h3> */}
            {/* <h4>Available Endpoints:</h4>
            <ul>
              {Object.entries(apiInfo.endpoints).map(([category, endpoints]: [string, any]) => (
                <li key={category}>
                  <strong>{category}:</strong>
                  <ul>
                    {Object.entries(endpoints).map(([endpoint, description]: [string, any]) => (
                      <li key={endpoint}>
                        {endpoint} - {description}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul> */}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <button
          onClick={fetchInspections}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Loading..." : "Fetch Inspections"}
        </button>

        <button
          onClick={fetchUsers}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Loading..." : "Fetch Users"}
        </button>

        <button
          onClick={createSampleInspection}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ffc107",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Sample Inspection
        </button>

        <button
          onClick={createSampleUser}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Sample User
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div>
          <h3>Inspections ({inspections.length})</h3>
          <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ddd", padding: "10px" }}>
            {inspections.map((inspection) => (
              <div
                key={inspection.id}
                style={{ border: "1px solid #eee", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}
              >
                <strong>ID:</strong> {inspection.id}
                <br />
                <strong>Inspector:</strong> {inspection.inspectedBy}
                <br />
                <strong>Location:</strong> {inspection.location}
                <br />
                <strong>Condition:</strong> {inspection.condition}
                <br />
                <strong>Date:</strong> {inspection.date}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3>Users ({users.length})</h3>
          <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ddd", padding: "10px" }}>
            {users.map((user) => (
              <div
                key={user.id}
                style={{ border: "1px solid #eee", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}
              >
                <strong>ID:</strong> {user.id}
                <br />
                <strong>Username:</strong> {user.username}
                <br />
                <strong>Password:</strong> {user.password}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
