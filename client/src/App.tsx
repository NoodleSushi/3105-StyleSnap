import React from 'react';
import GlobalStyles from './styles/GlobalStyles';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateOutfit from './pages/CreateOutfit';
import CreateWardrobe from './pages/CreateWardrobe';
import MyOutfits from './pages/MyOutfts';
import UploadItems from './pages/UploadItems';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-outfit" element={<CreateOutfit />} />
        <Route path="/create-wardrobe" element={<CreateWardrobe />} />
        <Route path="/my-outfits" element={<MyOutfits />} />
        <Route path="/upload-items" element={<UploadItems />} />
      </Routes>
      <GlobalStyles />
    </Router>
  );
};

export default App;
