import React from 'react';
import styled from 'styled-components';

const ClothingItemContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  cursor: pointer;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
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

interface ClothingItemProps {
  imageUrl: string;
  itemName: string;
  onClick: () => void;
  onRemove: () => void;
  showRemoveButton: boolean;
}

const ClothingItem: React.FC<ClothingItemProps> = ({ imageUrl, itemName, onClick, onRemove, showRemoveButton }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click event from reaching the parent container
    onClick();
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click event from reaching the parent container
    onRemove();
  };

  return (
    <ClothingItemContainer onClick={handleClick}>
      <Image src={imageUrl} alt={itemName} />
      <RemoveButton showRemoveButton={showRemoveButton} onClick={handleRemoveClick}>
        Remove
      </RemoveButton>
    </ClothingItemContainer>
  );
};

export default ClothingItem;

