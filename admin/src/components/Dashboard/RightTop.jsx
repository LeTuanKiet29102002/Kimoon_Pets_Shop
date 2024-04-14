import styled from "styled-components";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Toggle from "./DarkMode";
import { useDarkMode } from './DarkModeContext';



const Top = styled.div`
    display: flex;
    justify-content: end;
    gap: 2rem;
    height:40px;
`

const Button = styled.button`
    display: none;
`

const ThemeToggler = styled.div`
    background: var(--color-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.6rem;
    width: 4.2rem;
    cursor: pointer;
    border-radius: var(--border-radius-1);
    
`

const LightSpan = styled.span`
    font-size: 1.2rem;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active {
        background: var(--color-primary);
        color: white;
        border-radius: var(--border-radius-1);
    }
`

const DarkSpan = styled.span`
    font-size: 1.2rem;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active {
        background: var(--color-primary);
        color: white;
        border-radius: var(--border-radius-1);
    }
`

const Profile = styled.div`
    display: flex;
    gap: 2rem;
    text-align: right;
`

const Info = styled.div`

`

const ProfilePhoto = styled.div`
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50%;
    overflow: hidden;
`

const Img = styled.img`
object-fit: cover;
width: 100%;
height: 100%;
`

const Small = styled.small`

`

const RightTop = () => {
    // Lấy admin từ Redux
    const admin = useSelector((state) => state.admin.currentAdmin);
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    // const [isNight, setIsNight] = useState(false);

    // const handleToggle = (e) => {
    //     const isChecked = e.target.checked;
    //     setIsNight(isChecked);
    //     if (isChecked) {
    //         // Thực hiện hành động chỉ khi isChecked là true
    //         document.querySelector("body").classList.add("night");
    //         document.getElementById("toggle-div").classList.add("night");
    //         document.body.classList.add('dark-theme-variables');
    //     } else {
    //         document.querySelector("body").classList.remove("night");
    //         document.getElementById("toggle-div").classList.remove("night");
    //         document.body.classList.remove('dark-theme-variables');
    //     }
    // };


    // useEffect(() => {
    //     if (isNight) {
    //         // Thực hiện hành động chỉ khi isNight là true
    //         document.querySelector("body").classList.add("night");
    //         document.getElementById("toggle-div").classList.add("night");
    //         document.body.classList.add('dark-theme-variables');

    //     } else {
    //         document.querySelector("body").classList.remove("night");
    //         document.getElementById("toggle-div").classList.remove("night");
    //         document.body.classList.remove('dark-theme-variables');

    //     }
    // }, [isNight]);

    // const handleToggle = (e) => {
    //     const isChecked = e.target.checked;
    //     setIsNight(isChecked);
    // };
    return (
        <Top >
            <Toggle onChange={toggleDarkMode} isChecked={isDarkMode} />
            {/* <button onClick={toggleDarkMode}>
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button> */}
            <Profile>
                <Info>
                    <p>Hey, <b>{admin.hotennhanvien}</b></p>
                    <Small className="text-muted">{admin.machucvu === 1 ? "Nhân viên bán hàng" : admin.machucvu === 2 ? "Nhân viên tư vấn" : admin.machucvu === 3 ? "Nhân viên kế toán" : admin.machucvu === 4 ? "Nhân viên kho và vận chuyển" : admin.machucvu === 5 ? "Admin" : null}</Small>
                </Info>
                <ProfilePhoto>
                    <Img src={admin.hinhdaidiennhanvien} />
                </ProfilePhoto>
            </Profile>
        </Top>
    );
};

export default RightTop;













