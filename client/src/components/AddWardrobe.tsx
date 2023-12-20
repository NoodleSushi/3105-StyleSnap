import React from 'react';
import styled from 'styled-components';

const AddWardrobeButton = styled.button`
  background-color: transparent; 
  color: #fff; 
  padding: 10px 20px;
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

interface AddWardrobeProps {
  onClick: () => void;
}

const AddWardrobe: React.FC<AddWardrobeProps> = ({ onClick }) => {
  return (
    <AddWardrobeButton onClick={onClick}>
      <PlusSymbol>+</PlusSymbol> Add Wardrobe
    </AddWardrobeButton>
  );
};

export default AddWardrobe;
