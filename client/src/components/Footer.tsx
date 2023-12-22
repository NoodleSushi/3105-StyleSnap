import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 40px 20px;
  text-align: center;
`;

const Logo = styled.div`
  font-size: 2.5rem;
  color: #fff;
  font-weight: bold;
  padding-left: 2rem;
  font-family: 'Niagara Solid';
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;


const Copyright = styled.div`
  margin-top: 20px;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Logo>SS</Logo>
      <Description>Effortless wardrobe organization, making fashion a breeze.</Description>
      <Copyright>&copy; 2023 StyleSnap. All Rights Reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
