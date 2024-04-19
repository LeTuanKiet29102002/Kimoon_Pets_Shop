import { Send } from "@material-ui/icons";
import styled, { keyframes } from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 40vh;
  background: #ffffff;
  display: flex;
  /* flex-direction: column; */
  /* align-items: center;
  justify-content: center; */
  padding: 0 20px;
  position: relative;
  margin: 20px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 30px;
`;

const Letter = styled.div`
  flex: 1;
  padding: 20px;
  border: 1px solid red;
`;

const LostPet = styled.div`
  flex: 1;
  padding: 20px;
  border: 1px solid red;
`;

const Title = styled.h3`
  font-size: 40px;
  margin-bottom: 20px;
  color: var(--color-primary);
  text-align: center;
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
`;

const Desc = styled.div`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  transform-style: preserve-3d; /* Enable 3D transforms */
  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* Thay đổi hiệu ứng bóng khi hover */
  }
`;

const Input = styled.input`
  border: none;
  flex: 1;
  padding-left: 20px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  border: none;
  background-color: var(--color-primary);
  opacity: 1;
  color: white;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 20px; /* Bo tròn góc */
  font-size: 16px;
  font-weight: bold;
  display: flex; /* Sử dụng flexbox */
  align-items: center; /* Canh chỉnh icon theo chiều dọc */
  justify-content: center; /* Canh chỉnh icon theo chiều ngang */
  transition: all 0.3s ease;
  &:hover {
    opacity: 0.8;
    transform: scale(1.05); /* Phóng to một chút khi hover */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Hiệu ứng bóng */
  }
  &:focus {
    outline: none;
  }
`;

const slideIn = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
`;

const ButtonIcon = styled(Send)`
  animation: ${slideIn} 0.5s ease;
`;

const rotateX = keyframes`
    from {
        transform: rotateX(0deg);
    }
    to {
        transform: rotateX(360deg);
    }
`;

const rotateY = keyframes`
    from {
        transform: rotateY(0deg);
    }
    to {
        transform: rotateY(360deg);
    }
`;

const rotateZ = keyframes`
    from {
        transform: rotateZ(0deg);
    }
    to {
        transform: rotateZ(360deg);
    }
`;

const InputEffect = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  transform: translateZ(-1px); /* Đẩy lớp nền ra sau để hiển thị hiệu ứng */
  animation: ${rotateX} 5s linear infinite alternate,
    ${rotateY} 5s linear infinite alternate,
    ${rotateZ} 5s linear infinite alternate;
`;

const FeedBack = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Letter>
        <Title>Newsletter</Title>
        <Desc>
          Bạn sẽ nhận được thông báo sớm nhất về những thú cưng mới!!!
        </Desc>
        <InputContainer>
          <Input placeholder="Email của bạn ..." />
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            <ButtonIcon />
          </Button>
          <InputEffect /> {/* Thêm hiệu ứng 3D */}
        </InputContainer>
      </Letter>
      <LostPet>
        <Title>Lost Pets</Title>
        <Desc>
          Nếu bạn muốn tìm thú cưng của mình bị lạc hãy nhấp vào nút sau!!!
        </Desc>
        <button>Open modal Thu Lac</button>
      </LostPet>
    </Container>
  );
};

export default FeedBack;
