import React from "react";
import styled, { keyframes } from "styled-components";

const shineAnimation = keyframes`
    0% {
        transform: scale(0) rotate(45deg);
        opacity: 0;
    }
    80% {
        transform: scale(0) rotate(45deg);
        opacity: 0.5;
    }
    81% {
        transform: scale(4) rotate(45deg);
        opacity: 1;
    }
    100% {
        transform: scale(50) rotate(45deg);
        opacity: 0;
    }
`;

const CustomButton = styled.button`
  border: none;
  border-radius: 3px;
  height: 40px;
  padding: 0 16px;
  margin-bottom: 16px;
  background: var(--color-primary);
  background: linear-gradient(
    0deg,
    var(--color-primary) 0%,
    rgb(196, 142, 47) 100%
  );
  color: #fff;
  overflow: hidden;
  position: relative;
  transition: opacity 0.3s ease;

  &:hover {
    text-decoration: none;
    color: #fff;
    opacity: 0.7;
  }

  &:active {
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.3),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
      inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2);
  }

  &:before {
    content: "";
    position: absolute;
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;
    animation: ${shineAnimation} 3s ease-in-out infinite;
  }
`;

const Dot = styled.div`
  /* Style your dot here if needed */
`;

const CustomButtonWithDot = () => {
  return (
    <CustomButton>
      See More
      <Dot />
    </CustomButton>
  );
};

export default CustomButtonWithDot;
