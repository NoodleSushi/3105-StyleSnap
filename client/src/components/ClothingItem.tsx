import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

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
const ClothingItemContainer = styled.div`
  position: relative;
  border: 1px solid #ddd;
  align-items: center;
  border-radius: 8px;
  padding: 1.625rem;
  margin-bottom: 10px;
  background-color: #fff;
  cursor: pointer;
  width: 32%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${fadeIn} 0.5s ease;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 150px;
  border-radius: 8px;
`;
const RemoveButton = styled.button<{ showRemoveButton: boolean }>`
  background-color: #ff5757;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  display: ${({ showRemoveButton }) => (showRemoveButton ? 'block' : 'none')};
`;
const DeleteButton = styled.button`
  background-color: #a4a4a4;
  color: #ffff;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;

  &:hover {
    background-color: rgba(108, 94, 94, 0.8);
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
  z-index: 999; 
`;
const ModalContent = styled.div`
  background: white;
  color: #a4a4a4;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;
const ConfirmButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 0.5rem;
  margin: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const CancelButton = styled.button`
  background-color: #FF0000;
  color: white;
  padding: 0.5rem;
  margin: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

interface ClothingItemProps {
  imageUrl: string;
  itemName: string;
  onClick: () => void;
  onRemove: () => void;
  onDelete: () => void;
  showRemoveButton: boolean;
  createWardrobeContext?: boolean;
  isMyOutfitsContext?: boolean;
}

const ClothingItem: React.FC<ClothingItemProps> = ({ imageUrl, itemName, onClick, onRemove, onDelete, showRemoveButton, createWardrobeContext, isMyOutfitsContext }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    // Handle the confirmation logic here
    onDelete();
    setIsModalOpen(false);
  };

  return (
    <ClothingItemContainer onClick={handleClick}>
      {(createWardrobeContext || isMyOutfitsContext) && <DeleteButton onClick={handleDeleteClick}>x</DeleteButton>}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <p>Are you sure you want to remove this item from your wardrobe?</p>
            <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton>
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          </ModalContent>
        </ModalOverlay>
      )}
      <Image src={imageUrl} alt={itemName} />
      <RemoveButton showRemoveButton={showRemoveButton} onClick={handleRemoveClick}>
        Remove
      </RemoveButton>
    </ClothingItemContainer>
  );
};

export default ClothingItem;
