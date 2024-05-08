import React from "react";
import './ButtonThree.css';
import { useEffect, useRef, useState } from "react";
import ModalLostPet from "../ModalLostPet";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`

`

const ButtonThree = () => {
    const navigate = useNavigate();
    const handleClickLost = () => {
       navigate('/lostpets');
    }

    return (
        <Container>
            <button className="custom-btn btn-12"><span onClick={handleClickLost}>Click!</span><span>Bạn đang lạc thú cưng</span></button>
        </Container>

    );
};

export default ButtonThree;
