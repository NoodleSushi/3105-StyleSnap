import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const UploadItemContainer = styled.div`
  margin-top: 20px;
`;
const UploadButton = styled.button`
  background-color: #6C5E5E;
  color: white;
  padding: 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  padding: 0.75rem 1rem;
  margin-right: 10rem;
  width: 33.3%;

  &:hover {
    background-color: rgba(108, 94, 94, 0.6);
  }

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  &:focus-visible {
    box-shadow: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const UploadInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
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
`;
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 150px;
  border-radius: 8px;
`;
const StyledWardrobeSelect = styled.select`
  margin-bottom: 10px;
  width: 60%;
  padding: 0.5rem;
  font-size: 16px; 
  color: #333; 
  background-color: #fff; 
  border: 2px solid #ccc; 
  border-radius: 0.3rem; 
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0; 
  }

  &:focus {
    outline: none;
    border-color: #007bff; 
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); 
  }
`;

interface UploadItemProps {
  onUpload: (data: FormData) => void;
}

const UploadItem: React.FC<UploadItemProps> = ({ onUpload }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clothingName, setClothingName] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [clothingTypes, setClothingTypes] = useState<{ name: string, types: { clothingTypeId: number, name: string }[] }[]>([]);
  const [selectedClothingType, setSelectedClothingType] = useState<string>('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/clothing/hierarchy`)
      .then((response) => {
        setClothingTypes(response.data.hierarchy);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (clothingTypes.length === 0) {
      return;
    }
    setSelectedClothingType(clothingTypes[0].types[0].clothingTypeId.toString());
  }, [clothingTypes]);

  const handleButtonClick = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to handle form submission, e.g., send data to server
    const data = new FormData();
    data.append('name', clothingName);
    data.append('image', selectedImage!);
    data.append('clothingTypeId', selectedClothingType);
    onUpload(data);
    closeModal(); 
  };

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file!);
  };

  return (
    <UploadItemContainer>
      <UploadButton onClick={handleButtonClick}>Upload Item</UploadButton>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={stopPropagation}>
            <UploadForm onSubmit={handleFormSubmit}>
              {/* Input for photo upload */}
              <UploadInput
                type="file"
                accept=".png, .jpg"
                onClick={stopPropagation}
                onChange={handleImageChange}
              />

              {selectedImage && (
                <Image src={URL.createObjectURL(selectedImage)} alt="Preview" />
              )}


              {/* Input for item name */}
              <UploadInput
                type="text"
                placeholder="Item Name"
                onClick={stopPropagation}
                onChange={(event) => setClothingName(event.target.value)}
              />
              
              {/* Input for item type */}
              <StyledWardrobeSelect onChange={(e) => {
                console.log(e.target.value)
                setSelectedClothingType(e.target.value)
              }}>
                <option value="" disabled>Item Type</option>
                {clothingTypes.map((category) => (
                  <optgroup key={category.name} label={category.name}>
                    {category.types.map((type) => (
                      <option key={type.clothingTypeId} value={type.clothingTypeId}>{type.name}</option>
                    ))}
                  </optgroup>
                ))}
              </StyledWardrobeSelect>

              {/* Submit button */}
              <UploadButton type="submit">Submit</UploadButton>
            </UploadForm>
          </ModalContent>
        </ModalOverlay>
      )}
    </UploadItemContainer>
  );
};

export default UploadItem;