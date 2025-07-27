import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { LoginRequest } from '../types';

const Login = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      login(response.data.token);
      navigate('/');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ paddingTop: '5rem', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="dbz-card" style={{ padding: '3rem' }}>
              <div className="has-text-centered mb-5">
                <h1 className="title is-2" style={{ color: 'var(--dbz-orange)' }}>
                  Power Up!
                </h1>
                <p className="subtitle is-4" style={{ color: 'var(--dbz-blue)' }}>
                  Login to access Ki_Data
                </p>
              </div>

              {error && (
                <div className="notification is-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label" style={{ color: 'var(--dbz-orange)' }}>Email</label>
                  <div className="control">
                    <input
                      className="input dbz-input"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label" style={{ color: 'var(--dbz-orange)' }}>Password</label>
                  <div className="control">
                    <input
                      className="input dbz-input"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Your password"
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <button 
                      type="submit" 
                      className={`button dbz-button is-fullwidth is-large ${loading ? 'is-loading' : ''}`}
                      disabled={loading}
                    >
                      <strong>Login</strong>
                    </button>
                  </div>
                </div>
              </form>

              <div className="has-text-centered mt-4">
                <p>
                  Don't have an account? {' '}
                  <Link to="/register" style={{ color: 'var(--dbz-blue)', fontWeight: 'bold' }}>
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;