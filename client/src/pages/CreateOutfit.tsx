
import React, { useState } from 'react';
import Navbar from '../components/TopNav';
import ClothingItem from '../components/ClothingItem'; // Import the ClothingItem component
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
`;

const LeftColumn = styled.div`
  width: 200px;
  padding: 20px;
`;

const LargeCard = styled.div`
  flex: 1;
  border: 2px dashed #aaa;
  margin: 0 20px;
  padding: 20px;
  overflow: auto;
`;

const Dropdown = styled.select`
  margin-bottom: 10px;
  width: 100%;
  padding: 5px;
`;

const VerticalMenu = styled.div`
  margin-bottom: 20px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const MenuArrow = styled.div<{ isOpen: boolean }>`
  margin-left: auto;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const CollapsibleContent = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;



const CreateOutfit: React.FC = () => {
  const [selectedWardrobe, setSelectedWardrobe] = useState<string>('');
  const [menuItems, setMenuItems] = useState([
    { category: 'Outerwear', isOpen: false, cards: ['Card 1', 'Card 2'] },
    { category: 'Tops', isOpen: false, cards: ['Card 3', 'Card 4'] },
    { category: 'Bottoms', isOpen: false, cards: ['Card 5', 'Card 6'] },
    { category: 'Footwear', isOpen: false, cards: ['Card 7', 'Card 8'] },
    { category: 'Accessories', isOpen: false, cards: ['Card 9', 'Card 10'] },
    { category: 'Shoes', isOpen: false, cards: ['Card 11', 'Card 12'] },
  ]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const handleWardrobeChange = (value: string) => {
    setSelectedWardrobe(value);
  };

  const toggleMenu = (index: number) => {
    setMenuItems((prevItems) => {
      const updatedItems = prevItems.map((item, i) => ({
        ...item,
        isOpen: i === index ? !item.isOpen : item.isOpen,
      }));
      return updatedItems;
    });
  };
  

  const handleCardClick = (card: string) => {
    setSelectedCards((prevSelectedCards) => {
      // Check if the card is already selected
      if (prevSelectedCards.includes(card)) {
        // If selected, remove it
        return prevSelectedCards.filter((selectedCard) => selectedCard !== card);
      } else {
        // If not selected, add it
        return [...prevSelectedCards, card];
      }
    });
  };
  

  const handleRemoveCard = (card: string) => {
    console.log('Removing card:', card); // Add this line for debugging
    setSelectedCards((prevSelectedCards) => prevSelectedCards.filter((selectedCard) => selectedCard !== card));
  };

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <LeftColumn>
          <Dropdown onChange={(e) => handleWardrobeChange(e.target.value)}>
            {/* Your dropdown options */}
            <option value="wardrobe1">Wardrobe 1</option>
            <option value="wardrobe2">Wardrobe 2</option>
          </Dropdown>

          <VerticalMenu>
            {menuItems.map((item, index) => (
              <div key={index}>
                <MenuItem onClick={() => toggleMenu(index)}>
                  {item.category}
                  <MenuArrow isOpen={item.isOpen}>▶</MenuArrow>
                </MenuItem>
                <CollapsibleContent isOpen={item.isOpen}>
                  {/* Render ClothingItem components for this category */}
                  {item.cards.map((card, cardIndex) => (
                    <ClothingItem
                      key={cardIndex}
                      imageUrl={`your_image_url_${cardIndex + 1}.jpg`}
                      itemName={card}
                      onClick={() => handleCardClick(card)} onRemove={function (): void {
                        throw new Error('Function not implemented.');
                      } } showRemoveButton={false}
                    />
                  ))}
                </CollapsibleContent>
              </div>
            ))}
          </VerticalMenu>
        </LeftColumn>

        <LargeCard>
        {selectedCards.map((selectedCard, index) => (
          <ClothingItem
              key={selectedCard}
              imageUrl={`your_image_url_${index + 1}.jpg`}
              itemName={selectedCard}
              onClick={() => handleCardClick(selectedCard)}
              onRemove={() => handleRemoveCard(selectedCard)}
              showRemoveButton={true} // Corrected syntax
          />
          ))}
        </LargeCard>
      </ContentContainer>
    </PageContainer>
  );
};

export default CreateOutfit;


