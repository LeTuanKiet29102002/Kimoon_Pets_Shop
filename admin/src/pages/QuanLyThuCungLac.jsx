import React, { useState } from 'react';
import styled from 'styled-components';
import Aside from "../components/Dashboard/Aside";
import ThuCungLacMain from '../components/QuanLyThuCungLac/ThuCungLacMain';
import ThuCungLacRight from '../components/QuanLyThuCungLac/ThuCungLacRight';

const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 14rem auto 23rem;
`

const QuanLyThuCung = () => {
    const [reRenderData, setReRenderData] = useState(true);   // State để Compo ThuCungRight và ThuCungMain thay đổi Effect
    return (
        <Container>
            <Aside active="quanlythucunglac" />
            <ThuCungLacMain reRenderData={reRenderData} setReRenderData={setReRenderData} />
            <ThuCungLacRight reRenderData={reRenderData} setReRenderData={setReRenderData} />
        </Container>
    )
}

export default QuanLyThuCung;