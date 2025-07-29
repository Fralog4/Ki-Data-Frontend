import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import heroBackground from '../assets/dbz-hero-bg.jpg';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero is-fullheight dbz-hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 
              className="title is-1" 
              style={{ 
                color: 'white', 
                textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
                fontSize: '4rem',
                marginBottom: '1rem'
              }}
            >
              Welcome to Ki Data
            </h1>
            <h2 
              className="subtitle is-3" 
              style={{ 
                color: 'white', 
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                marginBottom: '2rem'
              }}
            >
              Your Ultimate Dragon Ball Character Database
            </h2>
            <div className="buttons is-centered">
              <Link to="/characters" className="button dbz-button is-large">
                <strong>Explore Characters</strong>
              </Link>
              {!isAuthenticated && (
                <Link to="/login" className="button dbz-button is-blue is-large">
                  <strong>Join the Adventure</strong>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <h2 className="title is-2 has-text-centered" style={{ color: 'var(--dbz-orange)', marginBottom: '3rem' }}>
            Discover the Dragon Ball Universe
          </h2>
          
          <div className="columns">
            <div className="column">
              <div className="dbz-card" style={{ padding: '2rem', textAlign: 'center', height: '100%' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                <h3 className="title is-4" style={{ color: 'var(--dbz-blue)' }}>Character Database</h3>
                <p>Explore detailed information about all your favorite Dragon Ball characters, their powers, and abilities.</p>
              </div>
            </div>
            
            <div className="column">
              <div className="dbz-card" style={{ padding: '2rem', textAlign: 'center', height: '100%' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
                <h3 className="title is-4" style={{ color: 'var(--dbz-blue)' }}>Dende AI Chat</h3>
                <p>Chat with Dende AI to get insights and answers about the Dragon Ball universe.</p>
              </div>
            </div>
            
            <div className="column">
              <div className="dbz-card" style={{ padding: '2rem', textAlign: 'center', height: '100%' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                <h3 className="title is-4" style={{ color: 'var(--dbz-blue)' }}>Power Levels</h3>
                <p>Track character abilities, transformations, and skill sets in our comprehensive database.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;