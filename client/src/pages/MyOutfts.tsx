import React, { useState } from 'react';
import Navbar from '../components/TopNav';
import WardrobeSelect from '../components/WardrobeSelect';
import Outfit from '../components/Outfit';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  max-width: 100%;
  flex: 1;
`;

const OutfitsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-around;
  padding: 2rem;
`;

const MyOutfits: React.FC = () => {
  // Mock data for outfits
  const outfits = [
    { id: 1, selectedCards: ['Card 1', 'Card 2', 'Card 3'] },
    { id: 2, selectedCards: ['Card 4', 'Card 5', 'Card 6'] },
    // Add more outfits as needed
  ];

  const [selectedWardrobe, setSelectedWardrobe] = useState<string>('wardrobe1');

  const handleWardrobeChange = (value: string) => {
    setSelectedWardrobe(value);
  };

  const handleCardClick = (card: string) => {
    console.log(`Card clicked: ${card}`);
    // Add your logic for handling card click
  };

  const handleRemoveCard = (card: string) => {
    console.log(`Remove card: ${card}`);
    // Add your logic for removing card 
  };

  return (
    <PageContainer>
      <Navbar />
      <WardrobeSelect onChange={(value) => handleWardrobeChange(value)} />

      <ContentContainer>
        <OutfitsContainer>
          {outfits.map((outfit) => (
            <Outfit
            key={outfit.id}
            selectedCards={outfit.selectedCards}
            handleCardClick={handleCardClick}
            handleRemoveCard={handleRemoveCard}
            />
          ))}
        </OutfitsContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default MyOutfits;
