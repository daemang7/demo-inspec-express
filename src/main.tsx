import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [apiInfo, setApiInfo] = useState<any>(null);
  const [inspections, setInspections] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loadingInspections, setLoadingInspections] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingClear, setLoadingClear] = useState(false);

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
    setLoadingInspections(true);
    try {
      const response = await fetch("/api/inspections");
      const data = await response.json();
      setInspections(data);
    } catch (error) {
      console.error("Error fetching inspections:", error);
    } finally {
      setLoadingInspections(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingUsers(false);
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

  const clearAllData = async () => {
    // if (!confirm("Are you sure you want to delete all data? This action is irreversible.")) {
    //   return;
    // }

    setLoadingClear(true);
    try {
      console.log("Sending clear all data request...");
      const response = await fetch("/api/clear-all", {
        method: "DELETE",
      });

      console.log("Clear response status:", response.status);

      if (response.ok) {
        console.log("Data cleared successfully on server");
        alert("All data has been successfully deleted!");
        setInspections([]);
        setUsers([]);
      } else {
        const errorText = await response.text();
        console.error("Failed to clear data:", errorText);
        alert("Failed to delete data.");
      }
    } catch (error) {
      console.error("Error clearing data:", error);
      alert("An error occurred while deleting data.");
    } finally {
      setLoadingClear(false);
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
          {loadingInspections ? "Loading..." : "Fetch Inspections"}
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
          {loadingUsers ? "Loading..." : "Fetch Users"}
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

        <button
          onClick={clearAllData}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loadingClear ? "Initializing..." : "Reset all data"}
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
