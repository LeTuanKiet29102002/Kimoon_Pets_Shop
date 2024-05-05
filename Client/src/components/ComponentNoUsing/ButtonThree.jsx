import React from "react";
import './ButtonThree.css';
import { useEffect, useRef, useState } from "react";
import ModalLostPet from "../ModalLostPet";
import styled from "styled-components";
import Toast from "../Toast";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const Container = styled.div`

`

const ButtonThree = ({ reRenderData, setReRenderData }) => {
    // const handleClickLost = () => {
    //     alert('hello thú lạc');
    // }

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState("")
    const [thuCungModal, setThuCungModal] = useState(null);

    const openModal = (modal) => {
        setShowModal(prev => !prev);
        setTypeModal(modal.type);
        setThuCungModal(modal.thucung);
    }
    // ===== TOAST =====
    const [dataToast, setDataToast] = useState({ message: "alo alo", type: "success" });
    const toastRef = useRef(null);  // useRef có thể gọi các hàm bên trong của Toast
    // bằng các dom event, javascript, ...

    const showToastFromOut = (dataShow) => {
        console.log("showToastFromOut da chay", dataShow);
        setDataToast(dataShow);
        toastRef.current.show();
    }

    return (
        <Container>
            <button className="custom-btn btn-12"><span onClick={() => openModal({ type: "themthucung" })}>Click!</span><span>Bạn đang lạc thú cưng</span></button>
            {/* <ModalLostPet
                showModal={showModal}   //state Đóng mở modal
                setShowModal={setShowModal} //Hàm Đóng mở modal
                type={typeModal}    //Loại modal
                thucung={thuCungModal}  //Dữ liệu bên trong modal
                setReRenderData={setReRenderData}   //Hàm rerender khi dữ liệu thay đổi
                // handleClose={handleClose}   //Đóng tìm kiếm
                showToastFromOut={showToastFromOut} //Hàm hiện toast
            /> */}
            {/* === TOAST === */}
            <Toast
                ref={toastRef}
                dataToast={dataToast}   // Thông tin cần hiện lên: Đối tượng { message,type }
            />
        </Container>

    );
};

export default ButtonThree;
