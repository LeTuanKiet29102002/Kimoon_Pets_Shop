import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import dog from "../assets/svg/w0nm_l6dx_210708.jpg"

const Container = styled.div`
  display: flex;
  padding: 20px 50px 0 50px;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  ${mobile({ flexDirection: "column" })}
  color:white;
  /* margin-top:10px; */
  /* margin: 20px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
    border-radius: 30px; */
`;

// Cột trái
const First = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h2`
  font-weight: 300;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

// Cột giữa
const Second = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  &:hover {
    color: var(--color-primary);
    transition: all 0.5s ease;
  }
`;

const ListItemLink = styled.li`
  width: 100%;
  margin-bottom: 10px;
  &:hover {
    color: var(--color-primary);
    transition: all 0.5s ease;
  }
`;

// Cột phải
const Third = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;
const Fourth = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;
const Line = styled.div`
  width: 20%;
  height: 6px;
  border-radius: 3px;
  background-color: #cccc;
`;
const Map = styled.div`
  width: 290px;
  height: 150px;
  border-radius: 5px;
  overflow: hidden;
`;
const End = styled.div`
  background-color: #cd3b0e;
  color: #ffffff80;
  font-size: 14.4px;
  line-height: 23.04px;
  padding: 15px 0px 15px;
  text-align: center;
`;

const Footer = () => {
    const navigate = useNavigate();

    return (
        <>
            <Container>
                <First>
                    <Title>Sơ lược về Kimoon Pets.</Title>
                    <Line></Line>
                    <Desc>
                        Kimoon Pets tâm niệm rằng thú cưng chính là những người bạn đáng quý
                        với con người. Vì vậy, chúng tôi luôn mong muốn đem lại cho thú cưng
                        những dịch vụ, tiện ích tốt nhất kết hợp cùng với công nghệ hiện đại
                        để mang tới những trải nghiệm tốt nhất dành cho khách hàng.
                    </Desc>
                    <Desc>
                        <p>
                            Ngoài ra, trại nhân giống chính của <strong>Kimoon Pets</strong>{" "}
                            có tại Sóc Sơn Hà Nội và Thủ Dầu Một, Bình Dương đang sở hữu hơn
                            500 con giống với các loại thú cảnh lớn nhỏ khác nhau.
                        </p>
                    </Desc>
                </First>
                <Second>
                    <Title>Chính sách mua bán</Title>
                    <Line></Line>
                    <List>
                        <ListItemLink
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Chính sách bảo mật
                        </ListItemLink>
                        <ListItemLink
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Chính sách vận chuyển và thanh toán
                        </ListItemLink>
                        <ListItemLink
                            onClick={() => {
                                navigate("/WarrantyPolicy");
                            }}
                        >
                            Chính sách đổi trả và bảo hành
                        </ListItemLink>
                        <ListItemLink
                            onClick={() => {
                                navigate("/ContactShop");
                            }}
                        >
                            Chính sách hỗ trợ trả góp 0%
                        </ListItemLink>
                    </List>
                    <Title>Liên kết truy cập nhanh</Title>
                    <Line></Line>
                    <List>
                        <ListItem
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Trang chủ
                        </ListItem>
                        <ListItem
                            onClick={() => {
                                navigate("/cart");
                            }}
                        >
                            Giỏ hàng
                        </ListItem>
                        <ListItem
                            onClick={() => {
                                navigate("/products/1");
                            }}
                        >
                            Chó
                        </ListItem>
                        <ListItem
                            onClick={() => {
                                navigate("/products/2");
                            }}
                        >
                            Mèo
                        </ListItem>
                        <ListItem>Chim cảnh</ListItem>
                        <ListItem>Cá cảnh</ListItem>
                        <ListItem>Hamster</ListItem>
                        <ListItem>Thú cưng khác</ListItem>
                        <ListItem>Tài khoản</ListItem>
                        <ListItem>Đặt mua</ListItem>
                    </List>
                    <SocialContainer>
                        <SocialIcon color="3B5999">
                            <Facebook />
                        </SocialIcon>
                        <SocialIcon color="E4405F">
                            <Instagram />
                        </SocialIcon>
                        <SocialIcon color="55ACEE">
                            <Twitter />
                        </SocialIcon>
                        <SocialIcon color="E60023">
                            <Pinterest />
                        </SocialIcon>
                    </SocialContainer>
                </Second>
                <Third>
                    <Title>Liên hệ</Title>
                    <Line></Line>
                    <ContactItem>
                        <Room style={{ marginRight: "10px" }} />
                        Số 1 đường Trần Hữu Dực, Phường Mỹ Đình 2, Quận Nam Từ Liêm, Thành
                        phố Hà Nội, Việt Nam
                    </ContactItem>
                    <ContactItem>
                        <Room style={{ marginRight: "10px" }} />
                        Số 1 đường Trần Hữu Dực, Phường Mỹ Đình 2, Quận Nam Từ Liêm, Thành
                        phố Hà Nội, Việt Nam
                    </ContactItem>
                    <ContactItem>
                        <Room style={{ marginRight: "10px" }} />
                        Số 1 đường Trần Hữu Dực, Phường Mỹ Đình 2, Quận Nam Từ Liêm, Thành
                        phố Hà Nội, Việt Nam
                    </ContactItem>
                    <ContactItem>
                        <Phone style={{ marginRight: "10px" }} />
                        +84 398307588
                    </ContactItem>
                    <ContactItem>
                        <MailOutline style={{ marginRight: "10px" }} />
                        letuankiet@student.haui.edu.vn
                    </ContactItem>
                    <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
                </Third>
                <Fourth>
                    <Title>Dẫn đường tới shop</Title>
                    <Line></Line>
                    <Desc>Shop Hà Nội</Desc>
                    <Map>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8915735831333!2d105.86406699999999!3d20.996983000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad1900326e27%3A0x55a2ed798a97c7ab!2sPet%20House%20-%20Shop%20Th%C3%BA%20C%C6%B0ng!5e0!3m2!1svi!2s!4v1704968822275!5m2!1svi!2s"
                            title="hanoi"
                        ></iframe>
                    </Map>
                    <Desc>Shop Thành phố HCM</Desc>
                    <Map>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.5656216979982!2d106.76165352918159!3d10.867629216568993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752776f4e0e9b3%3A0x9c94334fb989e8c2!2zUGV0aG91c2UgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1657944104932!5m2!1svi!2s"
                            title="HCM"
                        ></iframe>
                    </Map>
                </Fourth>
            </Container>
            <End>
                <div>
                    <img src={dog} alt="Zalo" style={{ width: "28px", height: "28px", borderRadius: "3px" , margin:"8px"}}/>
                    <strong>Kimoon Pets - Shop bán thú cưng uy tín nhất Việt Nam</strong>
                </div>
            </End>
        </>
    );
};

export default Footer;
