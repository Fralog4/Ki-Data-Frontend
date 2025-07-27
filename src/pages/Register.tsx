import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { RegisterRequest } from '../types';

const Register = () => {
  const [formData, setFormData] = useState<RegisterRequest>({
    name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
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
      await authAPI.register(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="section" style={{ paddingTop: '5rem', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="dbz-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <h1 className="title is-2" style={{ color: 'var(--dbz-orange)' }}>
                  Welcome to the Team!
                </h1>
                <p className="subtitle is-4" style={{ color: 'var(--dbz-blue)' }}>
                  Registration successful! Redirecting to login...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ paddingTop: '5rem', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="dbz-card" style={{ padding: '3rem' }}>
              <div className="has-text-centered mb-5">
                <h1 className="title is-2" style={{ color: 'var(--dbz-orange)' }}>
                  Join the Warriors
                </h1>
                <p className="subtitle is-4" style={{ color: 'var(--dbz-blue)' }}>
                  Create your Ki_Data account
                </p>
              </div>

              {error && (
                <div className="notification is-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label" style={{ color: 'var(--dbz-orange)' }}>First Name</label>
                      <div className="control">
                        <input
                          className="input dbz-input"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your first name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="column">
                    <div className="field">
                      <label className="label" style={{ color: 'var(--dbz-orange)' }}>Last Name</label>
                      <div className="control">
                        <input
                          className="input dbz-input"
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          placeholder="Your last name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

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
                      placeholder="Create a strong password"
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
                      <strong>Create Account</strong>
                    </button>
                  </div>
                </div>
              </form>

              <div className="has-text-centered mt-4">
                <p>
                  Already have an account? {' '}
                  <Link to="/login" style={{ color: 'var(--dbz-blue)', fontWeight: 'bold' }}>
                    Login here
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

export default Register;