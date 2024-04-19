import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ArrowRightAltOutlined, CheckCircleRounded } from "@material-ui/icons";
import "../css/main.css";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Container = styled.div`


`

const Wrapper = styled.div`
margin:20px 40px 60px 40px;
padding:30px;
line-height: 36px;

`

const UL = styled.ul`

`
const LI = styled.li`

`


const ContactShop = () => {
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <p><em><strong>CHÍNH SÁCH BẢO HÀNH tại Kimoon Pets</strong></em></p>
                <UL>
                    <LI><>🐷&nbsp;&nbsp;</>Tất cả các bé thú cưng của Kimoon Pets đều được bảo hành sức khỏe 7 ngày tính từ ngày bé về nhà mới. (Nhằm nâng cao chất lượng dịch vụ, Pet House mở bán gói dịch vụ bảo hành sức khỏe 365 ngày đối với khách hàng có nhu cầu)</LI>
                    <LI><>🐶&nbsp;&nbsp;</>Hỗ trợ và đồng hành tư vấn cùng khách hàng trong suốt quá trình nuôi thú cưng. Có bất kỳ vấn đề gì không rõ, khách hàng có thể gọi hoặc chát zalo với Kimoon Pet để được giải đáp nhanh nhất.</LI>
                    <LI><>🐱&nbsp;&nbsp;</>Hơn thế nữa, chúng tôi sẽ hỗ trợ tư vấn cho khách hàng về dinh dưỡng và sức khỏe của bé trọn đời. Cụ thể là cách xử lý, điều trị các loại bệnh thông thường, hay làm sao để chăm cho bé mập, khỏe ,lông đẹp…</LI>
                    <LI><>🐰&nbsp;&nbsp;</>Trong vòng 7 ngày đầu về nhà mới, nếu không may thú cưng của bạn bị bệnh, chúng tôi sẽ chịu hoàn toàn chi phí điều trị. Trường hợp xấu nhất là bé tử vong, chúng tôi sẽ đền bù khách hàng một bé thú cưng khác có giá trị tương tự.</LI>
                    <LI><>🐭&nbsp;&nbsp;</>Kimooon Pets có liên kết với các bệnh viện thú y lớn ở Saigon và Hà Nội để hỗ trợ khách hàng và các bé thú cưng một cách nhanh và hiệu quả nhất, với chi phí tối ưu nhất.</LI>
                    <LI><>🐠&nbsp;&nbsp;</>Hoàn trả: Chúng tôi cam kết không bán chó tật lỗi, lai tạp. Nếu sau khi bé về nhà mới mà khách hàng phát hiện có những vấn đề nêu trên, chúng tôi sẽ hoàn trả toàn bộ chi phí vận chuyển và bồi thường gấp đôi số tiền khách đã mua.</LI>
                </UL>
                <p><strong>Lưu ý:</strong> Thú cưng khi còn nhỏ hay bị các bệnh về đường ruột như là bệnh Parvo và Care, mà nguyên nhân rất hay xảy ra là khách hàng cho chó ăn đồ ăn lạ, đồ ăn không phải của chó, hoặc cho chó cắn, gặm xương, cành cây… dẫn đến bị viêm ruột. Hoặc tiếp xúc với môi trường công cộng có nhiều mần bệnh, hoặc liếm chân tay khi mới ở bên ngoài môi trường về…<br></br>Vì vậy quý khách hành phải lưu ý đến vấn đề này. Nếu trong thời gian bảo hành mà xảy ra các bệnh đường ruột mà nguyên nhân do những lỗi sơ ý của người mua thì chúng tôi không có trách nhiệm bảo hành.</p>
                <h4><strong>PetHouse – Cửa hàng mua bán thú cảnh Uy tín tại Việt Nam</strong></h4>
                <UL>
                    <LI><>🙈&nbsp;&nbsp;</>1045 Kha vạn cân, Thủ Đức, Tp.Hcm (Đối diện 1294c Kha Vạn Cân, Linh Trung, Thủ Đức, Hồ Chí Minh)</LI>
                    <LI><>🙉&nbsp;&nbsp;</>293 Minh Khai – Hai Bà Trưng – Hà Nội</LI>
                    <LI><>🙊&nbsp;&nbsp;</>Hotline: 0379.88.868</LI>
                    <LI><>🐵&nbsp;&nbsp;</>Email: kimoonpets.com.vn@gmail.com</LI>
                </UL>
            </Wrapper>
            <Footer />
        </Container>
    )
}
export default ContactShop;