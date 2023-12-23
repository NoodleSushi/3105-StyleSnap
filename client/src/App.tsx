import React, { useEffect, useState } from 'react';
import GlobalStyles from './styles/GlobalStyles';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateOutfit from './pages/CreateOutfit';
import CreateWardrobe from './pages/CreateWardrobe';
import MyOutfits from './pages/MyOutfts';
import axios from 'axios';
import profile from './profile';
import { useAtom } from 'jotai';

const PrivateWrapper = ({ children, login = true }: {children: JSX.Element, login?: boolean}) => {
  const [, setUsername] = useAtom(profile.usernameAtom);
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.post(`${import.meta.env.VITE_API}/auth/user`)
        .then((res) => {
          if (res.status === 200) {
            const user = res.data.user;
            setUsername(user.username);
            setLogged(true);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return null; // Or a loading spinner
  }

  if (logged && login) {
    return children;
  } else if (logged) {
    return <Navigate to="/dashboard" replace />;
  } else if (login) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateWrapper login={false}><Home /></PrivateWrapper>} />
        <Route path="/dashboard" element={<PrivateWrapper><Dashboard /></PrivateWrapper>} />
        <Route path="/create-outfit" element={<PrivateWrapper><CreateOutfit /></PrivateWrapper>} />
        <Route path="/create-wardrobe" element={<PrivateWrapper><CreateWardrobe /></PrivateWrapper>} />
        <Route path="/my-outfits" element={<PrivateWrapper><MyOutfits /></PrivateWrapper>} />
      </Routes>
      <GlobalStyles />
    </Router>
  );
};

export default App;
