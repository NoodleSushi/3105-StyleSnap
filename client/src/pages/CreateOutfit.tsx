import React, { useEffect, useState } from 'react';
import Navbar from '../components/TopNav';
import ClothingItem from '../components/ClothingItem';
import styled from 'styled-components';
import Outfit from '../components/Outfit';
import WardrobeSelect from '../components/WardrobeSelect';
import SaveButton from '../components/SaveOutfit';
import ShimmerEffect from '../components/ShimmerEffect';
import Footer from '../components/Footer';
import axios from 'axios';

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
  padding: 3rem;
  margin-top: 3rem;
`;
const RightColumn = styled.div`
  flex: 1;
  padding: 1rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
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



const CreateOutfit: React.FC = () => {
  const [selectedWardrobe, setSelectedWardrobe] = useState<string>('');
  const [menuItems, setMenuItems] = useState < { category: string, isOpen: boolean, cards: { id: number, name: string, imageUrl: string }[]}[]>([]);
  const [selectedCards, setSelectedCards] = useState<{ id: number, name: string, imageUrl?: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const [wardrobeChoices, setWardrobeChoices] = useState<{ id: number, name: string }[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/user/wardrobes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      const wardrobe = res.data.wardrobes as { wardrobeId: number, owner: number, name: string }[];
      setWardrobeChoices(
        wardrobe.map((wardrobe) => ({
          id: wardrobe.wardrobeId,
          name: wardrobe.name,
        })),
      );
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    setSelectedWardrobe(wardrobeChoices[0]?.id.toString());
  }, [wardrobeChoices]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/clothing/categories`)
      .then((res) => {
        const categories = res.data.clothingCategories as { clothingCatId: number, name: string }[];
        axios.get(`${import.meta.env.VITE_API}/wardrobes/${selectedWardrobe}/clothing`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then((res) => {
            const clothing = res.data.clothing as { clothingId: number, name: string, image: string, clothingCatId: number }[];
            const clothingByCategory = categories.map((category) => ({
              category: category.name,
              isOpen: false,
              cards: clothing.filter((item) => item.clothingCatId === category.clothingCatId).map((item) => ({
                id: item.clothingId,
                name: item.name,
                imageUrl: item.image,
              })),
            })).filter((item) => item.cards.length > 0);
            setMenuItems(clothingByCategory);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, [selectedWardrobe])
  
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

  const handleCardClick = (card: { id: number, name: string, imageUrl?: string }) => {
    setSelectedCards((prevSelectedCards) => {
      // Check if the card is already selected
      if (prevSelectedCards.some((selectedCard) => selectedCard.id === card.id)) {
        // If selected, remove it
        return prevSelectedCards.filter((selectedCard) => selectedCard.id !== card.id);
      } else {
        // If not selected, add it
        return [...prevSelectedCards, card];
      }
    });
  };



  const handleRemoveCard = (card: { id: number, name: string, imageUrl?: string }) => {
    console.log('Removing card:', card); // Add this line for debugging
    setSelectedCards((prevSelectedCards) => prevSelectedCards.filter((selectedCard) => selectedCard.id !== selectedCard.id));
  };

  const handleDeleteClick = () => {
    // Logic for ClothingItem deletion from the database
    console.log('Delete button clicked');
  };

  return (
    <PageContainer>
      <Navbar />

      { isLoading ? (
        <ShimmerEffect style={{ flex: 1, padding: '2rem' }} />
      ) : (
      <>
      <ContentContainer>
        <LeftColumn>
        <WardrobeSelect choices={wardrobeChoices} onChange={(value) => handleWardrobeChange(value)} />
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
                        id={card.id}
                        key={cardIndex}
                        imageUrl={card.imageUrl || `your_image_url_${cardIndex + 1}.jpg`}
                        itemName={card.name}
                        onClick={() => handleCardClick(card)}
                        onRemove={() => handleRemoveCard(card)}
                        onDelete={() => handleDeleteClick()}
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
            <h2>Create Your Outfit</h2>

                <Outfit
                  selectedCards={selectedCards}
                  handleCardClick={handleCardClick}
                  handleRemoveCard={handleRemoveCard} 
                  showRemoveButton={true}
                  isMyOutfitsContext={false}
                  showDeleteButton={false}
              />
         
          <SaveButton onClick={() => console.log('Save button clicked')} />
        </RightColumn>
      </ContentContainer>

    <Footer />
    </>
    )}
    </PageContainer>
  );
};

export default CreateOutfit;