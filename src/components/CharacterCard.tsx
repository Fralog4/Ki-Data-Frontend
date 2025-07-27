import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { characterAPI } from '../services/api';
import { Character } from '../types';
import characterPlaceholder from '../assets/character-placeholder.jpg';

interface CharacterCardProps {
  character: Character;
  onDelete: (id: number) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onDelete }) => {
  const { isAdmin } = useAuth();

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${character.name}?`)) {
      try {
        await characterAPI.delete(character.id);
        onDelete(character.id);
      } catch (error) {
        console.error('Error deleting character:', error);
        alert('Failed to delete character');
      }
    }
  };

  return (
    <div className="column is-one-third">
      <div className="dbz-card" style={{ padding: '1.5rem', height: '100%' }}>
        <div className="has-text-centered mb-4">
          <img 
            src={character.image || characterPlaceholder} 
            alt={character.name}
            className="character-avatar"
            style={{ marginBottom: '1rem' }}
          />
          <h3 className="title is-4" style={{ color: 'var(--dbz-orange)', marginBottom: '0.5rem' }}>
            {character.name}
          </h3>
        </div>

        <div className="content">
          <p><strong>Race:</strong> {character.race}</p>
          <p><strong>Gender:</strong> {character.gender}</p>
          <p><strong>Birth Date:</strong> {character.birthDate}</p>
          
          {character.skillSet && character.skillSet.length > 0 && (
            <div>
              <strong>Skills:</strong>
              <div className="tags" style={{ marginTop: '0.5rem' }}>
                {character.skillSet.slice(0, 3).map((skill, index) => (
                  <span 
                    key={index} 
                    className="tag" 
                    style={{ 
                      background: 'var(--dbz-gradient-primary)', 
                      color: 'white',
                      margin: '2px'
                    }}
                  >
                    {skill}
                  </span>
                ))}
                {character.skillSet.length > 3 && (
                  <span className="tag is-light">+{character.skillSet.length - 3} more</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="buttons is-centered" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
          <Link 
            to={`/characters/${character.id}`} 
            className="button dbz-button"
          >
            View Details
          </Link>
          
          {isAdmin() && (
            <button 
              onClick={handleDelete}
              className="button is-danger"
              style={{ marginLeft: '0.5rem' }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;