import React, { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import { characterAPI } from '../services/api';
import { Character } from '../types';

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await characterAPI.getAll();
      setCharacters(response.data);
    } catch (error) {
      setError('Failed to load characters');
      console.error('Error fetching characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCharacter = (characterId: number) => {
    setCharacters(characters.filter(char => char.id !== characterId));
  };

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    character.race.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <div className="has-text-centered">
            <div className="is-size-3" style={{ color: 'var(--dbz-orange)' }}>
              Loading characters...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section">
        <div className="container">
          <div className="notification is-danger">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ paddingTop: '5rem' }}>
      <div className="container">
        <div className="has-text-centered mb-6">
          <h1 className="title is-1" style={{ color: 'var(--dbz-orange)' }}>
            Dragon Ball Characters
          </h1>
          <p className="subtitle is-4" style={{ color: 'var(--dbz-blue)' }}>
            Discover the warriors of the universe
          </p>
        </div>

        {/* Search Bar */}
        <div className="field mb-6">
          <div className="control has-icons-left">
            <input
              className="input is-large dbz-input"
              type="text"
              placeholder="Search characters by name or race..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>

        {filteredCharacters.length === 0 ? (
          <div className="has-text-centered">
            <p className="is-size-4" style={{ color: 'var(--dbz-blue)' }}>
              No characters found. {searchTerm && 'Try adjusting your search.'}
            </p>
          </div>
        ) : (
          <div className="columns is-multiline">
            {filteredCharacters.map(character => (
              <CharacterCard
                key={character.id}
                character={character}
                onDelete={handleDeleteCharacter}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Characters;