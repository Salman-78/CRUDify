/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    const response = await fetch(`https://crudify-v7hs.onrender.com/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    if (!response.ok) {
      setError(result.error);
    } else {
      setError("🎉 Successfully deleted!");
      setTimeout(() => {
        setError("");
        getData();
      }, 1500);
    }
  };

  const getData = async () => {
    const response = await fetch("https://crudify-v7hs.onrender.com/");
    const result = await response.json();
    if (!response.ok) {
      setError(result.error);
    } else {
      setData(result);
      setError("");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-4">
      {error && (
        <div className="alert alert-warning text-center fw-bold fs-5">
          {error}
        </div>
      )}

      <h2 className="text-center fw-bold mb-4" style={{ color: "#6C63FF" }}>
        🌟 User Directory
      </h2>

      <div className="row justify-content-center">
        {data.map((ele) => (
          <div key={ele._id} className="col-md-4 col-lg-3 mb-4">
            <div
              className="card text-white shadow"
              style={{
                background: "linear-gradient(135deg,rgb(133, 145, 198),rgb(193, 145, 240))",
                border: "none",
              }}
            >
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2">{ele.email}</h6>
                <span
                  className="badge mb-3"
                  style={{
                    backgroundColor: "#FAD02C",
                    color: "#000",
                    width: "fit-content",
                    padding: "0.5em 0.8em",
                  }}
                >
                  Age: {ele.age}
                </span>

                <div className="mt-auto d-flex justify-content-between">
                  <Link
                    to={`/${ele._id}`}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: "#00C9A7",
                      color: "#fff",
                      fontWeight: "500",
                    }}
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(ele._id)}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: "#EF476F",
                      color: "#fff",
                      fontWeight: "500",
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
