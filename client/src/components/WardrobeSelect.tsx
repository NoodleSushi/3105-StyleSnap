import React from 'react';
import styled from 'styled-components';

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

interface WardrobeSelectProps {
  onChange: (value: string) => void;
}

const WardrobeSelect: React.FC<WardrobeSelectProps> = ({ onChange }) => (
  <StyledWardrobeSelect onChange={(e) => onChange(e.target.value)}>
    <option value="wardrobe1">Wardrobe 1</option>
    <option value="wardrobe2">Wardrobe 2</option>
  </StyledWardrobeSelect>
);

export default WardrobeSelect;
