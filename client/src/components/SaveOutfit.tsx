import React, { useState } from 'react';
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
  margin-left: 3rem;
  width: 32%;

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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  color: #a4a4a4;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const YesButton = styled.button`
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    background-color: #4cae4c;
  }
`;

const NoButton = styled.button`
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #c9302c;
  }
`;

interface SaveButtonProps {
  onClick: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleYesClick = () => {
    onClick();
    setIsModalOpen(false);
  };

  const handleNoClick = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleButtonClick}>Save Outfit</Button>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <p>Save this outfit to this wardrobe's outfit collection?</p>
            <YesButton onClick={handleYesClick}>Yes</YesButton>
            <NoButton onClick={handleNoClick}>No</NoButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default SaveButton;
