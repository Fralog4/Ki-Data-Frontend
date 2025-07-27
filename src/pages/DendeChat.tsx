import React, { useState } from 'react';
import { aiAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Message } from '../types';

const DendeChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Dende, your guide to the Dragon Ball universe. How can I help you today?",
      sender: 'dende' as const,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="section" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div className="notification is-warning">
            Please login to access the Dende Chat feature.
          </div>
        </div>
      </div>
    );
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await aiAPI.dendechat(inputMessage);
      
      const dendeMessage: Message = {
        id: Date.now() + 1,
        text: response.data.message || "I'm here to help with any Dragon Ball questions!",
        sender: 'dende' as const,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, dendeMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'dende' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="section" style={{ paddingTop: '5rem', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <div className="dbz-card" style={{ padding: '0', height: '70vh', display: 'flex', flexDirection: 'column' }}>
              <div style={{ 
                background: 'var(--dbz-gradient-primary)', 
                padding: '1.5rem', 
                borderRadius: '15px 15px 0 0',
                color: 'white'
              }}>
                <h1 className="title is-3" style={{ color: 'white', marginBottom: '0.5rem' }}>
                  💚 Dende AI Chat
                </h1>
                <p className="subtitle is-6" style={{ color: 'white', margin: 0 }}>
                  Ask me anything about the Dragon Ball universe!
                </p>
              </div>

              <div 
                style={{ 
                  flex: 1, 
                  padding: '1rem', 
                  overflowY: 'auto',
                  backgroundColor: '#ffffff'
                }}
              >
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`message ${message.sender === 'user' ? 'is-pulled-right' : ''}`}
                    style={{ marginBottom: '1rem', maxWidth: '80%' }}
                  >
                    <div 
                      style={{
                        padding: '1rem',
                        borderRadius: '15px',
                        background: message.sender === 'user' 
                          ? 'var(--dbz-gradient-blue)' 
                          : '#f0f0f0',
                        color: message.sender === 'user' ? 'white' : '#333',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <p style={{ margin: 0 }}>{message.text}</p>
                      <small style={{ 
                        opacity: 0.7, 
                        fontSize: '0.75rem',
                        color: message.sender === 'user' ? 'rgba(255,255,255,0.8)' : '#666'
                      }}>
                        {message.timestamp.toLocaleTimeString()}
                      </small>
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="message" style={{ marginBottom: '1rem', maxWidth: '80%' }}>
                    <div 
                      style={{
                        padding: '1rem',
                        borderRadius: '15px',
                        background: '#f0f0f0',
                        color: '#333'
                      }}
                    >
                      <p style={{ margin: 0 }}>Dende is thinking...</p>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ 
                padding: '1rem', 
                borderTop: '1px solid #ddd',
                backgroundColor: '#ffffff',
                borderRadius: '0 0 15px 15px'
              }}>
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <textarea
                      className="textarea dbz-input"
                      rows={2}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask Dende about Dragon Ball..."
                      disabled={loading}
                    />
                  </div>
                  <div className="control">
                    <button 
                      className={`button dbz-button ${loading ? 'is-loading' : ''}`}
                      onClick={sendMessage}
                      disabled={loading || !inputMessage.trim()}
                      style={{ height: '100%' }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DendeChat;