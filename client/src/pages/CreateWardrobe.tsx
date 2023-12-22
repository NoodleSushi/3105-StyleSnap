import React, { useEffect, useState } from 'react';
import Navbar from '../components/TopNav';
import ClothingItem from '../components/ClothingItem';
import styled from 'styled-components';
import Footer from '../components/Footer';
import UploadItem from '../components/UploadItem';
import AddWardrobe from '../components/AddWardrobe';
import WardrobeSelect from '../components/WardrobeSelect';
import ShimmerEffect from '../components/ShimmerEffect';


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const ContentContainer = styled.div`
  display: flex;
  max-width: 100%;
  flex: 1;
  overflow-y: auto;
`;
const LeftColumn = styled.div`
  width: 30%;
  padding: 3rem;
`;
const RightColumn = styled.div`
  flex: 1;
  padding: 3rem;
  height: 100%;
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-between; 
  width: 100%; 
`;
const WardrobeInfoContainer = styled.div`
  width: 100%; /* Ensure full width */
  margin-bottom: 20px; /* Add margin between the <p> and VerticalMenu */
`;

const VerticalMenu = styled.div`
  margin-bottom: 2rem;
  width: 80%;
  padding: 2rem;
`;
const MenuItem = styled.div`
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Add this line to align content horizontally */

  &:hover {
    background-color: #A4A4A4; /* Change to the desired hover background color */
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
  overflow: auto; /* Change this line to make the content scrollable */
  max-height: 200px; /* Adjust the max height as needed */
`;
const RowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
`;

const CreateWardrobe: React.FC = () => {
  const [selectedWardrobe, setSelectedWardrobe] = useState<string>('wardrobe1');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data)
    const fetchData = async () => {
      // Simulate a delay (you can replace this with actual data fetching)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false); // Set loading to false once data is fetched
    };

    fetchData();
  }, []);

  const handleWardrobeChange = (value: string) => {
    setSelectedWardrobe(value);
  };

  // Sample data for ClothingItem components
  const clothingItems = [
    { imageUrl: 'your_image_url_1.jpg', itemName: 'Item 1', showRemoveButton: false },
    { imageUrl: 'your_image_url_2.jpg', itemName: 'Item 2', showRemoveButton: false },

  ];

  const [menuItems, setMenuItems] = useState([
    { category: 'Outerwear', isOpen: false, cards: ['Card 1', 'Card 2'] },
    { category: 'Tops', isOpen: false, cards: ['Card 3', 'Card 4'] },
    { category: 'Bottoms', isOpen: false, cards: ['Card 5', 'Card 6'] },
    { category: 'Footwear', isOpen: false, cards: ['Card 7', 'Card 8'] },
    { category: 'Accessories', isOpen: false, cards: ['Card 9', 'Card 10'] },
    { category: 'Shoes', isOpen: false, cards: ['Card 11', 'Card 12'] },
  ]);

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
    // Logic for handling card click
    console.log(`Clicked on ${card}`);
  };

  const handleRemoveCard = (card: string) => {
    // Logic for handling card removal
    console.log(`Remove ${card}`);
  };

  const handleDeleteClick = () => {
    // Logic for ClothingItem deletion from the database
    console.log('Delete button clicked');
  };

  return (

    <PageContainer>
      <Navbar />
      {isLoading ? (
        <ShimmerEffect style={{ flex: 1, padding: '2rem' }} />
      ) : (
      <>
      <ContentContainer>
            <LeftColumn>
            <WardrobeSelect onChange={(value) => handleWardrobeChange(value)} />
              <AddWardrobe onClick={() => console.log('Add Wardrobe clicked')} />
            </LeftColumn>

            <RightColumn>
              <WardrobeInfoContainer>
                <h2>Your Clothing Items</h2>
                <VerticalMenu>
                  {menuItems.map((item, index) => (     
                    <div key={index}>
                      <MenuItem onClick={() => toggleMenu(index)}>
                        {item.category}
                        <MenuArrow isOpen={item.isOpen}>▶</MenuArrow>
                      </MenuItem>

                      <CollapsibleContent isOpen={item.isOpen}>
                        <RowContainer>
                          {item.cards.map((card, cardIndex) => (
                            <ClothingItem
                              key={cardIndex}
                              imageUrl={`your_image_url_${cardIndex + 1}.jpg`}
                              itemName={card}
                              onClick={() => handleCardClick(card)}
                              onRemove={() => handleRemoveCard(card)}
                              onDelete={() => handleDeleteClick()}
                              showRemoveButton={false}
                              createWardrobeContext={true} />
                          ))}
                        </RowContainer>
                      </CollapsibleContent>
                    </div>
                  ))}

                  <UploadItem onClick={() => console.log('Upload button clicked')} />
                </VerticalMenu>
              </WardrobeInfoContainer>
            </RightColumn>
          </ContentContainer>

          <Footer />
       </>
       )}
    </PageContainer>
  );
};

export default CreateWardrobe;