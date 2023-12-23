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
  choices: { id: number, name: string }[];
}

const WardrobeSelect: React.FC<WardrobeSelectProps> = ({ choices, onChange }) => (
  <StyledWardrobeSelect onChange={(e) => onChange(e.target.value)}>
    {choices.length === 0 ? (
      <option value="" disabled selected>Create a new Wardrobe</option>
    ) : (
      <>
        <option value="" disabled>Select a wardrobe</option>
        {choices.map((option) => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </>
    )}
  </StyledWardrobeSelect>
);

export default WardrobeSelect;
