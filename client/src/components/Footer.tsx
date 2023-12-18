import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: lightgrey;
  width: 100%;
  padding: 20px 0;
  text-align: center;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
  margin: 0 10px;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <LinkContainer>
        <StyledLink href="#">Link 1</StyledLink>
        <StyledLink href="#">Link 2</StyledLink>
        <StyledLink href="#">Link 3</StyledLink>
      </LinkContainer>
    </FooterContainer>
  );
};

export default Footer;
