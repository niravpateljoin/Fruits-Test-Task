import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AllFruits from './components/AllFruits';
import FavoritesPage from './components/FavoritesPage';
import { FavoritesProvider } from './context/FavoritesContext';


const App = () => (
  <FavoritesProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<AllFruits />} />
        <Route path="/favorites" element={<FavoritesPage />} />
       
      </Routes>
    </BrowserRouter>
  </FavoritesProvider>
);

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
