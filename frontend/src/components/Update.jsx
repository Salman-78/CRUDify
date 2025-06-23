import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [error, setError] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch single user data
  const getSingleData = async () => {
    const response = await fetch(`http://localhost:5000/${id}`);
    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
    } else {
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };

  // Submit updated data
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };

    const response = await fetch(`http://localhost:5000/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    const result = await response.json();

    if (response.ok) {
      setError("");
      navigate("/read");
    } else {
      setError(result.error || "Update failed");
    }
  };

  useEffect(() => {
    getSingleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container my-5">
      <div
        className="p-4 shadow rounded"
        style={{
          background: "linear-gradient(135deg, #d9afd9, #97d9e1)",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <h2 className="text-center mb-4 text-dark fw-bold">✏️ Edit User</h2>

        {error && (
          <div className="alert alert-danger text-center fw-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Age</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-dark fw-bold">
              ✅ Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
