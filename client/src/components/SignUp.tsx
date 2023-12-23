import { useState } from 'react';
import styled from 'styled-components';
import signupImage from '../assets/signup.jpg';
import { keyframes } from 'styled-components';
import axios from 'axios';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const SignUpContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  margin: auto;
  padding: 5rem;
  overflow: hidden; /* Ensure the animation doesn't reveal hidden content */
  
  &::after {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(${signupImage});
    background-size: cover;
    background-position: center;
    opacity: 0;
    animation: ${fadeIn} 1.5s ease-in-out forwards; 
    z-index: -1; 
  }
`;
const SignUpContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  
`;
const WelcomeText = styled.p`
  flex: 1;
  margin: 0;
  font-size: 1.275rem;
  color: #fff;
  text-shadow: 9px 2px 4px rgba(0, 0, 0, 0.2);
`;
const SignUpForm = styled.form`
  flex: 1;
  align-items: center;
  display: flex;
  margin-left: 5rem;
  flex-direction: column;
  background: rgba(60, 60, 60, 0.5);
  gap: 15px;
  border-radius: 0.5rem;
  padding: 2rem;
  margin-top: 5rem;
  padding-right: 3rem;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out forwards;

`;
const FormGroup = styled.div`
  width: 100%;
  text-align: left;
`;
const Label = styled.label`
  margin-bottom: 5px;
  color: #fff;
`;
const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  background-color: #ffffff;
  border-radius: 0.2rem;
  color: #333;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:focus {
    background-color: #f0f0f0;
    color: #000;
  }
`
const SignUpButton = styled.button`
background-color: #ffffff;
border: 0;
border-radius: 0.2rem;
box-sizing: border-box;
color: #111827;
font-family: "Inter var", ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
font-size: 0.875rem;
font-weight: 600;
width: 33%;
line-height: 1rem;
padding: 0.75rem 1rem;
text-align: center;
text-decoration: none solid #d1d5db;
text-decoration-thickness: auto;
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
cursor: pointer;
margin-bottom: 2rem;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
transition: background-color 0.3s ease, color 0.3s ease;

&:hover {
  background-color: rgb(249, 250, 251);
}

&:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

&:focus-visible {
  box-shadow: none;
}

@media (max-width: 768px) {
  width: 100%;
}
`;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password === confirmPassword) {
      console.log('Signing up with:', email, username, password);
      axios.post(`${import.meta.env.VITE_API}/auth/signup`, {
        email,
        username,
        password,
      })
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          // UI feedback for error
        });
    } else {
      console.log('Passwords do not match. Please try again.');
      // UI feedback for password mismatch
    }
  };

  return (
    <SignUpContainer>
      <SignUpContentWrapper>
        <WelcomeText>
          <h1>StyleSnap</h1>
          <p>Your go-to for effortless wardrobe organization and personalized outfit inspiration, making fashion a breeze.</p>
        </WelcomeText>
        <SignUpForm>
          <h2>Sign Up</h2>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Username:</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Password:</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Confirm Password:</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>

          <SignUpButton type="button" onClick={handleSignUp}>
            Sign Up
          </SignUpButton>
        </SignUpForm>
      </SignUpContentWrapper>
    </SignUpContainer>
  );
};

export default SignUp;



