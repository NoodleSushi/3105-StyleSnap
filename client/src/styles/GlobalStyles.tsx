import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  h1{
    font-family: 'Niagara Solid';
    font-size: 8rem;
  }

  h2{
    font-family: 'Niagara Solid';
    font-size: 3rem;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: 'Encode Sans Expanded', sans-serif;
  }
`;

export default GlobalStyles;