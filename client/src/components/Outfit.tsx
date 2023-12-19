import React from 'react';
import styled from 'styled-components';
import ClothingItem from '../components/ClothingItem';

const LargeCard = styled.div`
  flex: 1;
  justify-content: space-around;
  border: 2px dashed #aaa;
  border-radius: 0.2rem;
  margin: 2rem;
  padding: 2rem;
  overflow: auto;
  max-height: 60%;
  max-width: 60%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  height: 30rem;
  width: 45rem;  
`;

interface OutfitProps {
  selectedCards: string[];
  handleCardClick: (card: string) => void;
  handleRemoveCard: (card: string) => void;
}

const Outfit: React.FC<OutfitProps> = ({ selectedCards, handleCardClick, handleRemoveCard }) => (
  <LargeCard>
    {selectedCards.map((selectedCard, index) => (
      <ClothingItem
        key={selectedCard}
        imageUrl={`your_image_url_${index + 1}.jpg`}
        itemName={selectedCard}
        onClick={() => handleCardClick(selectedCard)}
        onRemove={() => handleRemoveCard(selectedCard)}
        showRemoveButton={true}
      />
    ))}
  </LargeCard>
);

export default Outfit;
