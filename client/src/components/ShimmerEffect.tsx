import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmerAnimation = keyframes`
  0% {
    background-position: -200%;
  }
  100% {
    background-position: 200%;
  }
`;

const ShimmerContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const ShimmerEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #eee 30%, #ddd 50%, #eee 70%);
  background-size: 200% 100%;
  animation: ${shimmerAnimation} 1.5s linear infinite;
`;

export default ShimmerEffect;
