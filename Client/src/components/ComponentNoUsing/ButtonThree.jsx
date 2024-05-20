import React from "react";
import './ButtonThree.css';
import { useEffect, useRef, useState } from "react";
import ModalLostPet from "../ModalLostPet";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Toast from "../Toast";

const Container = styled.div`

`

const ButtonThree = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.currentUser);

    const handleClickLost = () => {
        if (user && user.manguoimua !== 0) {
            navigate('/lostpets');
        } else {
            const dataShow = {
                message: "Bạn phải login mới có thể dùng được chức năng này !!!",
                type: "danger",
              };
              showToastFromOut(dataShow);
        }
    }
    // ===== TOAST =====
    const [dataToast, setDataToast] = useState({
        message: "alo alo",
        type: "success",
    });
    const toastRef = useRef(null); // useRef có thể gọi các hàm bên trong của Toast
    // bằng các dom event, javascript, ...

    const showToastFromOut = (dataShow) => {
        console.log("showToastFromOut da chay", dataShow);
        setDataToast(dataShow);
        toastRef.current.show();
    };

    return (
        <Container>
            <button className="custom-btn btn-12"><span onClick={handleClickLost}>Click!</span><span>Bạn đang lạc thú cưng</span></button>
            {/* === TOAST === */}
            <Toast
                ref={toastRef}
                dataToast={dataToast} // Thông tin cần hiện lên: Đối tượng { message,type }
            />
        </Container>

    );
};

export default ButtonThree;
