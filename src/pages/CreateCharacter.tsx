import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { characterAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CreateCharacterRequest } from '../types';

const CreateCharacter = () => {
  const [formData, setFormData] = useState<CreateCharacterRequest>({
    name: '',
    race: '',
    gender: '',
    birthDate: '',
    skillSet: []
  });
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  if (!isAdmin()) {
    return (
      <div className="section" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div className="notification is-danger">
            Access denied. Admin privileges required.
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skillSet.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skillSet: [...formData.skillSet, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skillSet: formData.skillSet.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await characterAPI.create(formData);
      navigate('/characters');
    } catch (error) {
      setError('Failed to create character. Please try again.');
      console.error('Create character error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ paddingTop: '5rem', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <div className="dbz-card" style={{ padding: '3rem' }}>
              <div className="has-text-centered mb-5">
                <h1 className="title is-2" style={{ color: 'var(--dbz-orange)' }}>
                  Create New Character
                </h1>
                <p className="subtitle is-4" style={{ color: 'var(--dbz-blue)' }}>
                  Add a new warrior to the database
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
                      <label className="label" style={{ color: 'var(--dbz-orange)' }}>Character Name</label>
                      <div className="control">
                        <input
                          className="input dbz-input"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g., Goku"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="column">
                    <div className="field">
                      <label className="label" style={{ color: 'var(--dbz-orange)' }}>Race</label>
                      <div className="control">
                        <input
                          className="input dbz-input"
                          type="text"
                          name="race"
                          value={formData.race}
                          onChange={handleChange}
                          placeholder="e.g., Saiyan"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label" style={{ color: 'var(--dbz-orange)' }}>Gender</label>
                      <div className="control">
                        <div className="select is-fullwidth">
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="column">
                    <div className="field">
                      <label className="label" style={{ color: 'var(--dbz-orange)' }}>Birth Date</label>
                      <div className="control">
                        <input
                          className="input dbz-input"
                          type="date"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label" style={{ color: 'var(--dbz-orange)' }}>Skills & Abilities</label>
                  <div className="field has-addons">
                    <div className="control is-expanded">
                      <input
                        className="input dbz-input"
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="Add a skill or ability"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      />
                    </div>
                    <div className="control">
                      <button 
                        type="button" 
                        className="button dbz-button"
                        onClick={addSkill}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  
                  {formData.skillSet.length > 0 && (
                    <div className="tags mt-3">
                      {formData.skillSet.map((skill, index) => (
                        <span 
                          key={index} 
                          className="tag is-large" 
                          style={{ 
                            background: 'var(--dbz-gradient-primary)', 
                            color: 'white',
                            margin: '0.25rem'
                          }}
                        >
                          {skill}
                          <button 
                            type="button"
                            className="delete is-small"
                            onClick={() => removeSkill(skill)}
                          ></button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="buttons is-centered" style={{ marginTop: '3rem' }}>
                  <button 
                    type="submit" 
                    className={`button dbz-button is-large ${loading ? 'is-loading' : ''}`}
                    disabled={loading}
                  >
                    <strong>Create Character</strong>
                  </button>
                  
                  <button 
                    type="button" 
                    className="button dbz-button is-blue is-large"
                    onClick={() => navigate('/characters')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacter;