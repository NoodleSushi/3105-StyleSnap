import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ClothingItem from '../components/ClothingItem';

interface LargeCardProps {
  isCreateOutfitPage?: boolean;
}

const LargeCard = styled.div<LargeCardProps>`
  flex: 1;
  justify-content: space-around;
  border: 2px dashed #aaa;
  border-radius: 0.2rem;
  margin: 2rem;
  padding: 1rem;
  overflow: auto;
  max-height: 50%;
  max-width: 60%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  height: 30rem;
  width: 50rem;  
  transition: transform 0.3s ease;

  

  ///AHHHH I was trying to get this to not transform in create-outfit but wtv wtv
  ${({ isCreateOutfitPage }) =>
    !isCreateOutfitPage &&
    css`
      &:hover {
        transform: scale(1.2);              
      }
    `}
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
  padding: 2rem;
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
  margin: 0.2rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;


const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(164, 164, 164, 0.2);
  color: #fff;
  border: none;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

interface OutfitProps {
  id: number;
  selectedCards: { id: number, name: string, imageUrl?: string }[];
  handleCardClick: (cardId: number) => void;
  handleRemoveCard: (cardId: number) => void;
  showRemoveButton: boolean;
  isMyOutfitsContext: boolean;
  isCreateOutfitPage?: boolean;
}

const Outfit: React.FC<OutfitProps> = ({ id, selectedCards, handleCardClick, handleRemoveCard, showRemoveButton, isCreateOutfitPage = false }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleYesClick = () => {
    // Delete outfit logic here
    setIsDeleteModalOpen(false);
  };

  const handleNoClick = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <LargeCard key={`card${id}`} isCreateOutfitPage={isCreateOutfitPage}>
        <DeleteButton onClick={handleDeleteClick}>x</DeleteButton>
        {selectedCards.map((selectedCard, index) => (
          <ClothingItem
            key={selectedCard.id}
            id={selectedCard.id}
            imageUrl={selectedCard.imageUrl || `your_image_url_${index + 1}.jpg`}
            itemName={selectedCard.name}
            onClick={() => handleCardClick(selectedCard.id)}
            onRemove={() => handleRemoveCard(selectedCard.id)}
            showRemoveButton={showRemoveButton}
            onDelete={() => {
              // Add onDelete logic here
            }}
          />
        ))}
      </LargeCard>

      {isDeleteModalOpen && (
        <ModalOverlay key={`modal${id}`}>
          <ModalContent>
            <p>Would you like to delete this outfit?</p>
            <YesButton onClick={handleYesClick}>Yes</YesButton>
            <NoButton onClick={handleNoClick}>No</NoButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Outfit;