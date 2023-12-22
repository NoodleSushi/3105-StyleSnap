import React, { useEffect, useState } from 'react';
import Navbar from '../components/TopNav';
import WardrobeSelect from '../components/WardrobeSelect';
import Outfit from '../components/Outfit';
import styled from 'styled-components';
import signupImage from '../assets/signup.jpg';
import ClothingItem from '../components/ClothingItem';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import ShimmerEffect from '../components/ShimmerEffect';


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const HeaderContainer = styled.div<{ loaded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem;
  background: url(${signupImage});
  background-size: cover;
  background-position: center;
  opacity: ${({ loaded }) => (loaded ? '1' : '0')};
  transition: opacity 0.3s ease; /* Adjust the transition duration as needed */
`;
const LeftContainer = styled.div`
  width: 33.3%;
  padding: 3rem;
`;
const RightContainer = styled.div`
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 100vh;
  overflow: auto;
`;
const ContentContainer = styled.div`
  display: flex;
  max-width: 100%;
  flex: 1;
`;
const VerticalMenu = styled.div`
  margin-bottom: 20px;
`;
const MenuItem = styled.div`
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;  

  &:hover {
    background-color: #A4A4A4;  
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
  overflow: auto; 
  max-height: 200px;  
`;
const RowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;

`;
const OutfitsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr)); /* Adjust the minmax values as needed */
  gap: 2px;
  justify-content: center;
  padding: 2px;

`;
const ViewMoreButton = styled.button`
  background-color: transparent;
  color: #242424;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 10px;
  line-height: 2px;
  transition: height 0.3s ease, color 0.3s ease; 

  &:hover {
    text-decoration: underline;
    color: #F4E8DD;
    
  }
`;



const Dashboard: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Loading delay simulation
    const timeout = setTimeout(() => {
      setLoaded(true);
      setIsLoading(false); // Set isLoading to false when content is loaded
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  // Mock data for outfits
  const outfits = [
    { id: 1, selectedCards: ['Card 1', 'Card 2', 'Card 3'] },
    { id: 2, selectedCards: ['Card 4', 'Card 5', 'Card 6'] },
    { id: 2, selectedCards: ['Card 4', 'Card 5', 'Card 6'] },

  ];

  const [menuItems, setMenuItems] = useState([
    { category: 'Outerwear', isOpen: false, cards: ['Card 1', 'Card 2'] },
    { category: 'Tops', isOpen: false, cards: ['Card 3', 'Card 4'] },
    { category: 'Bottoms', isOpen: false, cards: ['Card 5', 'Card 6'] },
    { category: 'Footwear', isOpen: false, cards: ['Card 7', 'Card 8'] },
    { category: 'Accessories', isOpen: false, cards: ['Card 9', 'Card 10'] },
    { category: 'Shoes', isOpen: false, cards: ['Card 11', 'Card 12'] },
  ]);

  const [selectedWardrobe, setSelectedWardrobe] = useState<string>('wardrobe1');

  const handleWardrobeChange = (value: string) => {
    setSelectedWardrobe(value);
  };

  const handleCardClick = (card: string) => {
    console.log(`Card clicked: ${card}`);
    // Logic for handling cards
  };

  const handleRemoveCard = (card: string) => {
    console.log(`Remove card: ${card}`);
    // Logic for removing card 
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

  const handleViewMoreClothing = () => {
    navigate("/create-wardrobe")
  };

  const handleViewMoreOutfits = () => {
    navigate("/my-outfits")
  };



  return (
    <PageContainer>
      <Navbar />

      {isLoading ? (
        <ShimmerEffect style={{ flex: 1, padding: '2rem' }} />
      ) : (
      <>
      <HeaderContainer loaded={loaded}>

        <WardrobeSelect onChange={(value) => handleWardrobeChange(value)} />
      </HeaderContainer>

      <ContentContainer>
        <LeftContainer>
        <h2>Clothing Collection
            <ViewMoreButton onClick={handleViewMoreClothing}>
                View More<span style={{ marginLeft: '0.5rem' }}>➡</span>
              </ViewMoreButton>
          </h2>
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

                        showRemoveButton={false} onDelete={function (): void {
                          throw new Error('Function not implemented.');
                        }} />
                    ))}
                  </RowContainer>
                </CollapsibleContent>

              </div>
            ))}
          </VerticalMenu>
        </LeftContainer>

        <RightContainer>
          <h2>Outfit Collection
            <ViewMoreButton onClick={handleViewMoreOutfits}>
                View More<span style={{ marginLeft: '0.5rem' }}>➡</span>
              </ViewMoreButton>
          </h2>

          <OutfitsContainer>
            {outfits.map((outfit) => (
              <Outfit
                key={outfit.id}
                selectedCards={outfit.selectedCards}
                handleCardClick={handleCardClick}
                handleRemoveCard={handleRemoveCard}
                isMyOutfitsContext={true} 
                showRemoveButton={false}            
              />
            ))}
          </OutfitsContainer>

        </RightContainer>
      </ContentContainer>
      <Footer />

      </>
       )}
    </PageContainer>

  );
};

export default Dashboard;