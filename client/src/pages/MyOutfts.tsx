import React, { useEffect, useState } from 'react';
import Navbar from '../components/TopNav';
import WardrobeSelect from '../components/WardrobeSelect';
import Outfit from '../components/Outfit';
import styled from 'styled-components';
import signupImage from '../assets/signup.jpg';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import ShimmerEffect from '../components/ShimmerEffect';
import axios from 'axios';

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
  transition: opacity 0.3s ease; 
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  max-width: 100%;
  flex: 1;
`;
const CreateNewOutfitButton = styled.button`
  background-color: transparent; 
  color: #fff; 
  padding: 10px 20px;
  margin-top: 2rem;
  border: 2px solid #333; 
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold; 
  display: flex;
  align-items: center;

  &:hover {
    background-color: #333; 
    color: white; 
  }
`;
const PlusSymbol = styled.span`
  margin-right: 5px; 
`;
const OutfitsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-around;
  padding: 2rem;
`;


const MyOutfits: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  // const [selectedWardrobe, setSelectedWardrobe] = useState<string>('wardrobe1');
  const [outfitsDisplay, setOutfitsDisplay] = useState<{ id: number, selectedCards: {id: number, name: string, imageUrl: string}[] }[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/user/outfits`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => { 
        const outfits = res.data.outfits as { outfitId: number, name: string, clothes: { clothingId: number, name: string, image: string }[] }[];
        const outfitsDisplay = outfits.map((outfit) => ({
          id: outfit.outfitId,
          selectedCards: outfit.clothes.map((clothing) => ({
            id: clothing.clothingId,
            name: clothing.name,
            imageUrl: clothing.image,
          })),
        }));
        console.log(outfitsDisplay);
        setOutfitsDisplay(outfitsDisplay);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleWardrobeChange = (value: string) => {
  //   setSelectedWardrobe(value);
  // };

  const handleCreateOutfitView = () => {
    navigate("/create-outfit")
  };

  const handleCardClick = (card: { id: number, name: string, imageUrl?: string }) => {
    console.log(`Card clicked: ${card}`);
    // Logic for handling cards
  };

  const handleRemoveCard = (card: { id: number, name: string, imageUrl?: string }) => {
    console.log(`Remove card: ${card}`);
    // Add your logic for removing card 
  };

  return (
    <PageContainer>
      <Navbar />

      {!loaded ? (
        <ShimmerEffect style={{ flex: 1, padding: '2rem' }} />
      ) : (
      <>
      <HeaderContainer loaded={loaded}>
        {/* <WardrobeSelect onChange={(value) => handleWardrobeChange(value)} /> */}
      </HeaderContainer>

      <ContentContainer>
      <CreateNewOutfitButton onClick={handleCreateOutfitView}> 
        <PlusSymbol>+</PlusSymbol> Create New Outfit
      </CreateNewOutfitButton>

        <OutfitsContainer>
          {outfitsDisplay.map((outfit) => (
            <Outfit
              id={outfit.id}
              key={outfit.id}
              selectedCards={outfit.selectedCards}
              handleCardClick={handleCardClick}
              handleRemoveCard={handleRemoveCard}
              isMyOutfitsContext={true} 
              showRemoveButton={false}            
            />
          ))}
        </OutfitsContainer>
      </ContentContainer>
      <Footer />
      </>
       )}
    </PageContainer>
  );
};

export default MyOutfits;
