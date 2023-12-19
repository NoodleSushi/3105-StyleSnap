import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #6C5E5E;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  padding: 0.75rem 1rem;
  margin-right: 10rem;
  width: 33.3%;

  &:hover {
    background-color: rgba(108, 94, 94, 0.6);
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

interface SaveButtonProps {
  onClick: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>Save Outfit</Button>;
};

export default SaveButton;
