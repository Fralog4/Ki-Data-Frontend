import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="section" style={{ paddingTop: '5rem', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="dbz-card" style={{ padding: '3rem', textAlign: 'center' }}>
              <h1 className="title is-1" style={{ color: 'var(--dbz-orange)', fontSize: '6rem' }}>
                404
              </h1>
              <h2 className="title is-3" style={{ color: 'var(--dbz-blue)' }}>
                This page doesn't exist in our universe!
              </h2>
              <p className="subtitle is-5" style={{ marginBottom: '2rem' }}>
                Even the Dragon Balls can't find this page.
              </p>
              <Link to="/" className="button dbz-button is-large">
                <strong>Return to Earth</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
