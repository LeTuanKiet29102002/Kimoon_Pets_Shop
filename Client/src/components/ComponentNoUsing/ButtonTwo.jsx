import React from "react";
import styled from "styled-components";

const CustomButton = styled.button`
  background: linear-gradient(
    0deg,
    rgba(255, 151, 0, 1) 0%,
    rgba(251, 75, 2, 1) 100%
  );
  line-height: 42px;
  padding: 0;
  border: none;
  position: relative;

  &:hover {
    color: rgba(251, 75, 2, 1);
    background: transparent;

    &:before {
      height: 100%;
    }

    &:after {
      width: 100%;
    }
  }

  &:before,
  &:after {
    position: absolute;
    content: "";
    right: 0;
    bottom: 0;
    background: rgba(251, 75, 2, 1);
    box-shadow: -7px -7px 20px 0px rgba(255, 255, 255, 0.9),
      -4px -4px 5px 0px rgba(255, 255, 255, 0.9),
      7px 7px 20px 0px rgba(0, 0, 0, 0.2), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }

  &:before {
    height: 0%;
    width: 2px;
  }

  &:after {
    width: 0%;
    height: 2px;
  }
`;

const ButtonSpan = styled.span`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;

  &:before,
  &:after {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    background: rgba(251, 75, 2, 1);
    box-shadow: -7px -7px 20px 0px rgba(255, 255, 255, 0.9),
      -4px -4px 5px 0px rgba(255, 255, 255, 0.9),
      7px 7px 20px 0px rgba(0, 0, 0, 0.2), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }

  &:before {
    width: 2px;
    height: 0%;
  }

  &:after {
    height: 2px;
    width: 0%;
  }

  &:hover:before {
    height: 100%;
  }

  &:hover:after {
    width: 100%;
  }
`;

const CustomBtn = () => {
  return (
    <CustomButton className="custom-btn btn-7">
      <ButtonSpan>Read More 7</ButtonSpan>
    </CustomButton>
  );
};

export default CustomBtn;
