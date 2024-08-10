import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="container1">
        <div className="main">
          <h1>Welcome to the Library Management System</h1>

          <div className="description">
            <h4>How This App Works:</h4>
            <ul>
              <li> Create and manage forms for books and authors.</li>
              <li> Easily add new entries for books and authors.</li>
              <li> Edit or update existing records effortlessly.</li>
              <li> Delete entries when no longer needed.</li>
              <li> Click on the navigation links to get started.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container2">
        <div className="welcomeForm">
          <div className="card">
            <h3>Kindly choose your preference</h3>
          </div>
          <div className="navbar">
            <nav className="options">
              <Link to="/author">
                <h3>Author</h3>
              </Link>
              <Link to="/books">
                <h3>Books</h3>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
