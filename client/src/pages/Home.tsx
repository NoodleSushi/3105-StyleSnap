import React from 'react';
import LoginBar from '../components/LoginBar';
import SignUp from '../components/SignUp';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div>
      <LoginBar/>
      <SignUp />
      <Footer />

    </div>
  );
};

export default Home;