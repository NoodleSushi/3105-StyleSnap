import React from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
  margin-bottom: 10px;
  width: 100%;
  padding: 5px;
`;

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <SearchInput
      type="text"
      placeholder="Search for type or color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
