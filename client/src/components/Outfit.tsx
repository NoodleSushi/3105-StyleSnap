import React from 'react';
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

interface OutfitProps {
  selectedCards: string[];
  handleCardClick: (card: string) => void;
  handleRemoveCard: (card: string) => void;
  showRemoveButton: boolean;
  isMyOutfitsContext: boolean;
  isCreateOutfitPage?: boolean;
}

const Outfit: React.FC<OutfitProps> = ({ selectedCards, handleCardClick, handleRemoveCard, showRemoveButton, isCreateOutfitPage = false }) => (
  <LargeCard isCreateOutfitPage={isCreateOutfitPage}>
    {selectedCards.map((selectedCard, index) => (
      <ClothingItem
        key={selectedCard}
        imageUrl={`your_image_url_${index + 1}.jpg`}
        itemName={selectedCard}
        onClick={() => handleCardClick(selectedCard)}
        onRemove={() => handleRemoveCard(selectedCard)}
        showRemoveButton={showRemoveButton}
        onDelete={() => {
          // Add onDelete logic here
        }}
      />
    ))}
  </LargeCard>
);

export default Outfit;
