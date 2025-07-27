import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { characterAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Character } from '../types';
import characterPlaceholder from '../assets/character-placeholder.jpg';

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  const fetchCharacter = async () => {
    try {
      setLoading(true);
      const response = await characterAPI.getById(id!);
      setCharacter(response.data);
    } catch (error) {
      setError('Character not found');
      console.error('Error fetching character:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${character.name}?`)) {
      try {
        await characterAPI.delete(character.id);
        navigate('/characters');
      } catch (error) {
        console.error('Error deleting character:', error);
        alert('Failed to delete character');
      }
    }
  };

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <div className="has-text-centered">
            <div className="is-size-3" style={{ color: 'var(--dbz-orange)' }}>
              Loading character...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="section">
        <div className="container">
          <div className="notification is-danger">
            {error || 'Character not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ paddingTop: '5rem' }}>
      <div className="container">
        <div className="columns">
          <div className="column is-one-third">
            <div className="dbz-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <img 
                src={character.image || characterPlaceholder} 
                alt={character.name}
                style={{ 
                  width: '200px', 
                  height: '200px', 
                  borderRadius: '50%',
                  border: '4px solid var(--dbz-gold)',
                  boxShadow: 'var(--energy-glow)',
                  marginBottom: '1rem'
                }}
              />
              <h1 className="title is-2" style={{ color: 'var(--dbz-orange)' }}>
                {character.name}
              </h1>
            </div>
          </div>

          <div className="column is-two-thirds">
            <div className="dbz-card" style={{ padding: '2rem' }}>
              <h2 className="title is-3" style={{ color: 'var(--dbz-blue)', marginBottom: '2rem' }}>
                Character Details
              </h2>

              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label" style={{ color: 'var(--dbz-orange)' }}>Race</label>
                    <p className="is-size-5">{character.race}</p>
                  </div>

                  <div className="field">
                    <label className="label" style={{ color: 'var(--dbz-orange)' }}>Gender</label>
                    <p className="is-size-5">{character.gender}</p>
                  </div>

                  <div className="field">
                    <label className="label" style={{ color: 'var(--dbz-orange)' }}>Birth Date</label>
                    <p className="is-size-5">{character.birthDate}</p>
                  </div>
                </div>

                <div className="column">
                  <div className="field">
                    <label className="label" style={{ color: 'var(--dbz-orange)' }}>Character ID</label>
                    <p className="is-size-5">#{character.id}</p>
                  </div>
                </div>
              </div>

              {character.skillSet && character.skillSet.length > 0 && (
                <div className="field" style={{ marginTop: '2rem' }}>
                  <label className="label" style={{ color: 'var(--dbz-orange)' }}>Skills & Abilities</label>
                  <div className="tags">
                    {character.skillSet.map((skill, index) => (
                      <span 
                        key={index} 
                        className="tag is-large" 
                        style={{ 
                          background: 'var(--dbz-gradient-primary)', 
                          color: 'white',
                          margin: '0.25rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="buttons" style={{ marginTop: '3rem' }}>
                <button 
                  onClick={() => navigate('/characters')}
                  className="button dbz-button is-blue"
                >
                  Back to Characters
                </button>
                
                {isAdmin() && (
                  <button 
                    onClick={handleDelete}
                    className="button is-danger"
                    style={{ marginLeft: '1rem' }}
                  >
                    Delete Character
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;