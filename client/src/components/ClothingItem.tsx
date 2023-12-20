import React from 'react';
import styled,  { keyframes } from 'styled-components';


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
  position: relative; /* Change to relative positioning */
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
  animation: ${fadeIn} 0.5s ease; // Add animation property
`

const Image = styled.img`
  max-width: 100%;
  max-height: 150px; /* placeholder height and width */
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

interface ClothingItemProps {
  imageUrl: string;
  itemName: string;
  onClick: () => void;
  onRemove: () => void;
  onDelete: () => void; 
  showRemoveButton: boolean;
  createWardrobeContext?: boolean; 
}

const ClothingItem: React.FC<ClothingItemProps> = ({ imageUrl, itemName, onClick, onRemove, onDelete, showRemoveButton, createWardrobeContext }) => {
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
    onDelete();
  };

  return (
    <ClothingItemContainer onClick={handleClick}>
      {createWardrobeContext && <DeleteButton onClick={handleDeleteClick}>x</DeleteButton>}
      <Image src={imageUrl} alt={itemName} />
      <RemoveButton showRemoveButton={showRemoveButton} onClick={handleRemoveClick}>
        Remove
      </RemoveButton>
    </ClothingItemContainer>
  );
};

export default ClothingItem;