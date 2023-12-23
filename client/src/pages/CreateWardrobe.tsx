import React, { useEffect, useState } from 'react';
import Navbar from '../components/TopNav';
import ClothingItem from '../components/ClothingItem';
import styled from 'styled-components';
import Footer from '../components/Footer';
import UploadItem from '../components/UploadItem';
import AddWardrobe from '../components/AddWardrobe';
import WardrobeSelect from '../components/WardrobeSelect';
import ShimmerEffect from '../components/ShimmerEffect';
import axios from 'axios';

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
  width: 100%;
  margin-bottom: 20px;
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

const DeleteWardrobeButton = styled.button`
  background-color: transparent;
  color: #fff;
  padding: 10px 20px;
  border: 2px solid #333;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-top: 10px;

  &:hover {
    background-color: #f44336;
    color: white;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  color: #a4a4a4;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`;

const YesButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const NoButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  margin: 0.2rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const CreateWardrobe: React.FC = () => {
  const [selectedWardrobe, setSelectedWardrobe] = useState<string>('wardrobe1');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [wardrobeChoices, setWardrobeChoices] = useState<{ id: number, name: string }[]>([]);
  const [wardrobeRefresh, setWardrobeRefresh] = useState(false);

  const triggerWardrobeRefresh = () => {
    setWardrobeRefresh((prev) => !prev);
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/user/wardrobes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      const wardrobe = res.data.wardrobes as { wardrobeId: number, owner: number, name: string }[];
      setWardrobeChoices(
        wardrobe.map((wardrobe) => ({
          id: wardrobe.wardrobeId,
          name: wardrobe.name,
        })),
      );
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }, [wardrobeRefresh]);

  useEffect(() => {
    setSelectedWardrobe(wardrobeChoices[0]?.id.toString());
  }, [wardrobeChoices])

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
            }));
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

  const handleDeleteWardrobeClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleYesClick = () => {
    axios.delete(`${import.meta.env.VITE_API}/wardrobes/${selectedWardrobe}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      triggerWardrobeRefresh();
    }).catch((err) => {
      console.log(err);
    });
    setIsDeleteModalOpen(false);
  };

  const handleNoClick = () => {
    setIsDeleteModalOpen(false);
  };

  const [menuItems, setMenuItems] = useState < { category: string, isOpen: boolean, cards: { id: number, name: string, imageUrl: string }[]}[]>([]);

  const toggleMenu = (index: number) => {
    setMenuItems((prevItems) => {
      const updatedItems = prevItems.map((item, i) => ({
        ...item,
        isOpen: i === index ? !item.isOpen : item.isOpen,
      }));
      return updatedItems;
    });
  };

  const handleCardClick = (card: number) => {
    console.log(`Clicked on ${card}`);
  };

  const handleRemoveCard = (card: number) => {
    console.log(`Remove ${card}`);
  };

  const handleDeleteClick = () => {
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
            <WardrobeSelect choices={wardrobeChoices} onChange={(value) => handleWardrobeChange(value)} />
                <AddWardrobe onClick={(name: string) => {
                  axios.post(`${import.meta.env.VITE_API}/user/wardrobes`, {
                    name,
                  }, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                  }).then((res) => {
                    triggerWardrobeRefresh();
                  }).catch((err) => {
                    console.log(err);
                  });
                }} />
              <DeleteWardrobeButton onClick={handleDeleteWardrobeClick}>
                Delete Wardrobe
              </DeleteWardrobeButton>
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
                              id={card.id}
                              key={cardIndex}
                              imageUrl={card.imageUrl || `your_image_url_${cardIndex + 1}.jpg`}
                              itemName={card.name}
                              onClick={() => handleCardClick(card.id)}
                              onRemove={() => handleRemoveCard(card.id)}
                              onDelete={() => handleDeleteClick()}
                              showRemoveButton={false}
                              createWardrobeContext={true}
                            />
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
          {isDeleteModalOpen && (
            <ModalOverlay>
              <ModalContent>
                <p>Are you sure you want to delete this wardrobe?</p>
                <YesButton onClick={handleYesClick}>Yes</YesButton>
                <NoButton onClick={handleNoClick}>No</NoButton>
              </ModalContent>
            </ModalOverlay>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default CreateWardrobe;
