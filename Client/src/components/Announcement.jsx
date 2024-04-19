// // import styled from "styled-components";
// // import React from 'react';

// // const Container = styled.div`
// //     width: 100%;
// //     height: 30px;
// //     background-color: #fe6433;
// //     color: white;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     font-size: 14px;
// //     font-weight: 500;
// //     overflow: hidden;
// // `

// // const { useState, useEffect } = React;
// // const width = window.innerWidth;

// // const Maquree = ({ title, text }) => {
// //     const [pos, setPos] = useState(0);
// //     const [run, setRun] = useState(true);
// //     const scrollEff = () => {
// //         if (run) setPos(p => p < width ? p + 1 : -width);
// //     }

// //     useEffect(() => {
// //         const tm = setTimeout(scrollEff, 10);
// //         return () => clearTimeout(tm);
// //     }, [pos]);

// //     const onMouseEnter = (e) => {
// //         // console.log("mouse enter");
// //         setRun(false);
// //     }

// //     const onMouseLeave = (e) => {
// //         // console.log("mouse leave");
// //         setRun(true);
// //         setPos(pos + 1); // to trigger useEffect
// //     }

// //     const styles = {
// //         position: "relative",
// //         fontSize: "1em",
// //         right: pos + "px",
// //     };

// //     return (
// //         <h1 style={styles}
// //             onMouseEnter={onMouseEnter}
// //             onMouseLeave={onMouseLeave}
// //         ><mark style={{background: 'none'}}>{title}</mark> {text}</h1>
// //     )
// // }

// // const Announcement = () => {
// //     return (
// //         <Container>
// //             <Maquree title="hello" text="Siêu sale sập sàn 8/3 !!!" />
// //         </Container>
// //     );
// // };

// // export default Announcement;

// import React, { useState, useEffect } from 'react';
// import styled from "styled-components";

// const Container = styled.div`
//     width: 100%;
//     height: 30px;
//     background-color: #fe6433;
//     color: white;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 14px;
//     font-weight: 500;
//     overflow: hidden;
// `
// const MaqureeContainer = styled.div`
// position: relative;
// width: 100%;
// height: 100%;
// display: flex;
// `

// const MaqureeItem = styled.div`
// position: absolute;
// top: 0;
// white-space: nowrap;
// `

// const width = window.innerWidth;

// const Maquree = ({ title, text }) => {
//     const [pos, setPos] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setPos(prevPos => prevPos + 1);
//         }, 10); // Tốc độ chạy

//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         if (pos >= width) {
//             setPos(0);
//         }
//     }, [pos]);

//     const styles = {
//         position: "relative",
//         fontSize: "1em",
//         left: pos + "px",
//         margin: "0 1em 0 1em",
//     };

//     return (
//         <MaqureeItem style={styles}>
//             <h5>{title} {text}</h5>
//         </MaqureeItem>
//     )
// }

// const Announcement = () => {
//     return (
//         <Container>
//             <MaqureeContainer>
//                 <Maquree title="hello" text="Siêu sale sập sàn 8/3 !!!" />
//                 <Maquree title="hello" text="Siêu sale sập sàn 9/3 !!!" />
//                 <Maquree title="hello" text="Siêu sale sập sàn 10/3 !!!" />
//                 <Maquree title="hello" text="Siêu sale sập sàn 11/3 !!!" />
//                 <Maquree title="hello" text="Siêu sale sập sàn 12/3 !!!" />
//                 <Maquree title="hello" text="Siêu sale sập sàn 13/3 !!!" />
//             </MaqureeContainer>
//         </Container>
//     );
// };

// export default Announcement;

import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-family: "Roboto", sans-serif; */
  position: relative; /* Để có thể sử dụng position:absolute cho Title */
  box-shadow: 0 4px 8px 4px rgba(0, 0, 0, 0.3);
  width: 100%; /* Đảm bảo rằng Container không tràn khỏi màn hình */
  overflow: hidden; /* Ẩn bất kỳ phần nào tràn ra ngoài khu vực hiển thị */
`;

const Title = styled.div`
  position: absolute;
  background: #fe6433;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 24px;
  color: white;
  font-weight: bold;
  z-index: 200;
  height: 44px;
  &::after{
    content: "";
    position: absolute;
    top: 0;
    right: -10px;
    border-width: 22px 10px 22px 0;
    border-style: solid;
    border-color: #fe6433 transparent #fe6433 transparent;
  }
`;
const scroll = keyframes`
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(-1083px);
    }
`;
const List = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  animation: ${scroll} 25s infinite linear;
`;

const ListItem = styled.li`
  white-space: nowrap;
  padding: 10px 24px;
  color: #494949;
  position: relative;

  &::after {
    content: "";
    width: 1px;
    height: 100%;
    background: #b8b8b8;
    position: absolute;
    top: 0;
    right: 0;
  }

  &:last-child::after {
    display: none;
  }
`;

const Announcement = () => {
  return (
    <Container>
      <Title>Breaking News </Title>
      <List>
        <ListItem>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam!
        </ListItem>
        <ListItem>Lorem ipsum dolor sit</ListItem>
        <ListItem>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam!
        </ListItem>
        <ListItem>Siêu sale sập sàn 8/3 !!!</ListItem>
        <ListItem>Giảm giá đến 99% cho đơn hàng thứ 100!!!</ListItem>
      </List>
    </Container>
  );
};

export default Announcement;
