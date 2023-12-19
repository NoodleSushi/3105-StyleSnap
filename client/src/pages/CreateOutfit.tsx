import React, { useEffect, useState } from 'react';
import Navbar from '../components/TopNav';
import ClothingItem from '../components/ClothingItem'; // Import the ClothingItem component
import styled from 'styled-components';
import Outfit from '../components/Outfit';
import SaveButton from '../components/SaveOutfit';
import ShimmerEffect from '../components/ShimmerEffect';

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

const LeftColumn = styled.div`
  width: 33.3%;
  padding: 2rem;
`;

const RightColumn = styled.div`
  flex: 1;
  padding: 2rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
  justify-content: space-between;  // Add this line to align content horizontally

  &:hover {
    background-color: #A4A4A4;  // Change to the desired hover background color
    border-radius: 0.2rem;
  }
`;


const MenuArrow = styled.div<{ isOpen: boolean }>`
  margin-left: auto;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const CollapsibleContent = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  overflow: auto;  // Change this line to make the content scrollable
  max-height: 200px;  // Adjust the max height as needed
`;

const RowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
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
  const [isLoading, setIsLoading] = useState(true); // New state for loading

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data)
    const fetchData = async () => {
      // Simulate a delay (you can replace this with actual data fetching)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false); // Set loading to false once data is fetched
    };

    fetchData();
  }, []);
  
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

      { isLoading ? (
        <ShimmerEffect style={{ flex: 1, padding: '2rem' }} />
      ) : (
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
                  {/* Render ClothingItem components for this category in rows */}
                  <RowContainer>
                    {item.cards.map((card, cardIndex) => (
                      <ClothingItem
                        key={cardIndex}
                        imageUrl={`your_image_url_${cardIndex + 1}.jpg`}
                        itemName={card}
                        onClick={() => handleCardClick(card)}
                        onRemove={() => handleRemoveCard(card)}
                        showRemoveButton={false}
                      />
                    ))}
                  </RowContainer>
                </CollapsibleContent>

              </div>
            ))}
          </VerticalMenu>
        </LeftColumn>
                      
        <RightColumn>
          {/* Create Your Outfit */}
          <div>
            <p>Create Your Outfit</p>

            <Outfit
              selectedCards={selectedCards}
              handleCardClick={handleCardClick}
              handleRemoveCard={handleRemoveCard}
            />
          </div>

  
          <SaveButton onClick={() => console.log('Save button clicked')} />
        </RightColumn>
      </ContentContainer>
      )}
    </PageContainer>
  );
};

export default CreateOutfit;