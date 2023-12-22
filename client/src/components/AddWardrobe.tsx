import React, { useState } from 'react';
import styled from 'styled-components';

const AddWardrobeButton = styled.button`
  background-color: transparent;
  color: #fff;
  padding: 10px 20px;
  border: 2px solid #333;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #333;
    color: white;
  }
`;
const PlusSymbol = styled.span`
  margin-right: 5px;
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
  z-index: 999;
`;
const ModalContent = styled.div`
  background: white;
  color: #a4a4a4;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;
const YesButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #45a049;
  }
`;
const NoButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

interface AddWardrobeProps {
  onClick: () => void;
}

const AddWardrobe: React.FC<AddWardrobeProps> = ({ onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleYesClick = () => {
    onClick();
    setConfirmationMessage('Wardrobe has been added.');

    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  };

  const handleNoClick = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AddWardrobeButton onClick={handleButtonClick}>
        <PlusSymbol>+</PlusSymbol> Add Wardrobe
      </AddWardrobeButton>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <p>Add another wardrobe?</p>
            <YesButton onClick={handleYesClick}>Yes</YesButton>
            <NoButton onClick={handleNoClick}>No</NoButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {confirmationMessage && (
        <div style={{ position: 'fixed', top: '10px', right: '10px', background: 'white', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
          {confirmationMessage}
        </div>
      )}
    </>
  );
};

export default AddWardrobe;