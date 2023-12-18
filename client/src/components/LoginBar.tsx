import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';



const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4e8dd;
  padding: 10px;
  width: 100vw;
  height: 3rem;
  padding: 0.6rem 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  font-size: 2.5rem;
  color: #1e1e1e;
  font-weight: bold;
  padding-left: 2rem;
  font-family: 'Niagara Solid';
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  padding-right: 5rem;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const Input = styled.input`
  margin-right: 10px;
  background-color: #fff;
  border: 1px solid #a4a4a4;
  border-radius: 0.2rem;
  padding: 0.75rem 1rem;
  color: #333;
  flex: 1;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.4);
  }

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
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
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

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


const LoginBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Redirect to Dashboard page after "login"
    navigate('/dashboard');
  };

  return (
    <>
      <Container>
        <Navbar>
          <Logo>SS</Logo>
          <Form onSubmit={handleLogin}>
            <Input type="text" placeholder="Username" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button type="submit" onClick={handleLogin}>Login</Button>
          </Form>
        </Navbar>
      </Container>
    </>
  );
};

export default LoginBar;

