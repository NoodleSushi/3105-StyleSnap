import React from 'react';
import styled from 'styled-components';

const StyledWardrobeSelect = styled.select`
  margin-bottom: 10px;
  width: 100%;
  padding: 5px;
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
