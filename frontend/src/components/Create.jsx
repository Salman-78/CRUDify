import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css"; // custom CSS file for extra styles

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUser = { name, email, age };
    console.log(addUser);

    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addUser),
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      setName("");
      setEmail("");
      setAge();
      setError("");
      navigate("/read");
    }
  };

  return (
    <div className="container my-5 create-form-wrapper">
      <div className="form-card shadow-lg p-4 rounded-md">
        <h2 className="text-center text-primary mb-4">📋 Create New User</h2>

        {error && <div className="alert alert-danger">⚠️ {error} </div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">👤 Name</label>
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
            <label className="form-label fw-semibold">📧 Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">🎂 Age</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-gradient">
              🚀 Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
