import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateCharacter from './pages/CreateCharacter';
import DendeChat from './pages/DendeChat';
import NotFound from './pages/NotFound';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div style={{ paddingTop: '3.25rem' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-character" element={<CreateCharacter />} />
          <Route path="/chat" element={<DendeChat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
