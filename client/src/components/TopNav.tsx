import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 5rem;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const NavLink = styled(Link)`
  margin-right: 20px;
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    color: #6C5E5E;
    text-shadow: 2px 2px 8px rgba(79, 70, 229, 0.3);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;


const CreateNewButton = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #6C5E5E;
    text-shadow: 2px 2px 8px rgba(79, 70, 229, 0.3);
    transform: scale(1.05);
  }
`;

const CreateNewContent = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #f4e8dd;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
  overflow: hidden;
  border-radius: 4px;

  a {
    color: #333;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background-color: #6C5E5E;
      color: #fff;
      transform: translateX(5px);
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

const CreateNewContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover {
    ${CreateNewContent} {
      display: block;
    }
  }
`;

const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #6C5E5E;
    text-shadow: 2px 2px 8px rgba(79, 70, 229, 0.3);
    transform: scale(1.05);
  }
`;

const DropdownContent = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #f4e8dd;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
  overflow: hidden;
  border-radius: 4px;

  a {
    color: #333;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background-color: #6C5E5E;
      color: #fff;
      transform: translateX(5px);
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover {
    ${DropdownContent} {
      display: block;
    }
  }
`;


const TopNav: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNewDropdownOpen, setNewDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleNewDropdown = () => {
    setNewDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <Container>
        <Navbar>
          <Logo>SS</Logo>
          <LinksContainer>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <CreateNewContainer>
              <CreateNewButton onClick={toggleNewDropdown}>Create New</CreateNewButton>
              <CreateNewContent isOpen={isNewDropdownOpen}>
                <Link to="/create-outfit">Outfit</Link>
                <Link to="/create-wardrobe">Wardrobe</Link>
              </CreateNewContent>
            </CreateNewContainer>
            <NavLink to="/my-outfits">My Outfits</NavLink>
            <DropdownContainer>
              <DropdownButton onClick={toggleDropdown}>Username</DropdownButton>
              <DropdownContent isOpen={isDropdownOpen}>
                <Link to="/settings">Settings (way labot)</Link>
                <Link to="/">Logout</Link>
              </DropdownContent>
            </DropdownContainer>
          </LinksContainer>
        </Navbar>
      </Container>
    </>
  );
};

export default TopNav;



