import React, { useState } from 'react';
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

interface UploadItemProps {
  onClick: () => void;
}

const UploadItem: React.FC<UploadItemProps> = ({ onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    onClick();
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to handle form submission, e.g., send data to server
    closeModal(); 
  };

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
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
                accept="image/*"
                onClick={stopPropagation}
              />

              {/* Input for item color */}
              <UploadInput
                type="text"
                placeholder="Item Color"
                onClick={stopPropagation}
              />

              {/* Input for item type */}
              <UploadInput
                type="text"
                placeholder="Item Type"
                onClick={stopPropagation}
              />

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