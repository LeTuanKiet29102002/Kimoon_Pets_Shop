import React, { useState } from 'react';
import styled from 'styled-components';
import Aside from "../components/Dashboard/Aside";
import VouchersMain from '../components/QuanLyVouchers/VouchersMain';
import VouchersRight from '../components/QuanLyVouchers/VouchersRight';

const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 14rem auto 23rem;
`

const QuanLyVouchers = () => {
    const [reRenderData, setReRenderData] = useState(true);   // State để Compo ThuCungRight và ThuCungMain thay đổi Effect
    return (
        <Container>
            <Aside active="quanlyvouchers" />
            <VouchersMain reRenderData={reRenderData} setReRenderData={setReRenderData} />
            <VouchersRight reRenderData={reRenderData} setReRenderData={setReRenderData} />
        </Container>
    )
}

export default QuanLyVouchers;