import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ArrowRightAltOutlined, CheckCircleRounded } from "@material-ui/icons";
import "../css/main.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  margin: 20px 100px 60px 100px;
  padding: 30px;
  line-height: 36px;
`;

const IMG = styled.div`
  width: 100%;
  height: 336px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("http://thietkeshop247.com.vn/kcfinder/upload/images/Thiet-ke-shop-thu-cung-dep.jpg%282%29.jpg");
  background-position: center;
  border-radius: 10px;
  box-shadow: 2px 6px 12px #323437;
  overflow: hidden;
  margin-bottom: 20px;
`


const ContactShop = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <IMG>
          {/* <img src="http://thietkeshop247.com.vn/kcfinder/upload/images/Thiet-ke-shop-thu-cung-dep.jpg%282%29.jpg" alt="anh kimoon shop" /> */}
        </IMG>
        <h3 style={{ color: "var(--color-primary)", fontWeight: 300, textAlign: "center" }}>CHÍNH SÁCH HỖ TRỢ TRẢ GÓP LÃI SUẤT 0% TẠI KIMOON PETS</h3>
        <h2 style={{ textAlign: "center" }}>
          <u>
            Mua thú cưng trả góp với lãi suất 0% tại Kimoon Pets có gì đặc biệt:
          </u>
        </h2>
        <p>
          <>💖&nbsp;&nbsp;</>Với nhiều lý do khác nhau mà quý khách muốn mua chó mèo cảnh trả góp
          lãi suất 0%. Để hỗ trợ và giải quyết những nhu cầu mà khách hàng mong
          muốn. Kimoon Pets hỗ trợ chính sách mua trả góp 0% một cách nhanh chóng
          và thuần tiện nhất.
        </p>
        <h3>
          <strong>Những quyền lại khi trả góp chỉ có tại Kimoon Pets</strong>
        </h3>
        <ul>
          <li><>⭐&nbsp;&nbsp;</>
            Quý khách hàng chỉ cần có từ 1.000.000đ đã có thể rinh ngay một bé
            cún hoặc bé mèo xinh xắn tại Kimoon Pets.
          </li>
          <li><>⭐&nbsp;&nbsp;</>
            <span>Khách hàng được hỗ trợ trả góp với lãi suất 0%</span>
          </li>
          <li><>⭐&nbsp;&nbsp;</>Phí cà thẻ/phí nhập thẻ: Kimoon Pets hỗ trợ 100%</li>
          <li><>⭐&nbsp;&nbsp;</>Phí trả góp: Kimoon Pets hỗ trợ 50%</li>
        </ul>
        <p>
          <em>Lưu ý</em>: <strong>Kimoon Pets</strong> sẽ hỗ trợ tối đa tổng 2 phí
          là 1.000.000đ. &nbsp;Nếu tổng chi phí vượt quá, quý khách hàng vui
          lòng thanh toán thêm phụ phí.
        </p>
        <h3>
          <strong>Điều kiện trả góp</strong>
        </h3>
        <ul>
          <li><>⚠&nbsp;&nbsp;</>
            Quý khách sử dụng thẻ tín dụng hay Credit ( không áp dụng cho thẻ
            Debit). Áp dụng cho các loại thẻ như: VISA, MASTERCARD, UNIONPAY và
            JCB.
          </li>
          <li>
            Khách hàng sử dụng thẻ tín dụng của 1 trong các ngân hàng sau đây:
          </li>
        </ul>
        <figure
          id="attachment_10702"
          aria-describedby="caption-attachment-10702"
          style={{ width: "1154px" }}
          class="wp-caption aligncenter"
        >
          <img
            style={{boxShadow: "4px 4px 10px #000000", borderRadius: "10px"}}
            class="wp-image-10702 size-full"
            src="https://pethouse.com.vn/wp-content/uploads/2023/05/danh-sach-ngan-hang-ho-tro-tra-gop-qua-the-tin-dung.png"
            alt="danh sach ngan hang ho tro tra gop qua the tin dung"
            width="1154px"
            height="672px"
            srcset="
                            https://pethouse.com.vn/wp-content/uploads/2023/05/danh-sach-ngan-hang-ho-tro-tra-gop-qua-the-tin-dung.png         1154w,
                            https://pethouse.com.vn/wp-content/uploads/2023/05/danh-sach-ngan-hang-ho-tro-tra-gop-qua-the-tin-dung-687x400.png  687w,
                            https://pethouse.com.vn/wp-content/uploads/2023/05/danh-sach-ngan-hang-ho-tro-tra-gop-qua-the-tin-dung-768x447.png  768w
                          "
            sizes="(max-width: 1154px) 100vw, 1154px"
          />
          <figcaption id="caption-attachment-10702" class="wp-caption-text">
            danh sach ngan hang ho tro tra gop qua the tin dung
          </figcaption>
        </figure>
        <h3>
          <strong>Phí trả góp và thời gian trả góp.</strong>
        </h3>
        <ul>
          <li><>❗&nbsp;&nbsp;</>
            Tại Kimoon Pets quý khách hàng trả góp trong thời gian:
            3 tháng, 6 tháng, 9 tháng và 12 tháng.
          </li>
          <li><>❗&nbsp;&nbsp;</>
            <span>
              <span>
                Phí quẹt thẻ sẽ được&nbsp;
              </span>
              <span style={{ color: "#ed1c24" }}>
                Kimoon Pets sẽ hỗ trợ 100%.
              </span>
            </span>
          </li>
          <li><>❗&nbsp;&nbsp;</>
            Đối với phí trả góp, tuỳ thuộc vào thời gian trả góp
            và từng ngân hàng sẽ có mức phí khác nhau. Khi quý
            khách hàng quan tâm đến dịch vụ trả góp, vui lòng liên
            hệ qua hotline <strong>0379.889.868 </strong>nhân viên
            sẽ thực hiện thao tác&nbsp; thực tiếp trên máy cà thẻ
            Mpos và gửi báo giá chi tiết.
          </li>
          <li><>❗&nbsp;&nbsp;</>
            Bên Kimoon Pets sẽ hỗ trợ khách hàng 50% phí trả góp
          </li>
        </ul>
        <h3>
          <strong
          >Các điều kiện để mở thẻ tín dụng đối với khách hàng
            chưa có thẻ.</strong>

        </h3>
        <ul>
          <li><>✅&nbsp;&nbsp;</>Tuổi từ 20 – 60 tuổi.</li>
          <li>Hộ Khẩu thường trú.</li>
          <li><>✅&nbsp;&nbsp;</>
            Chứng minh thu nhập (tùy ngân hàng sẽ áp dụng quy định
            này. Có thể thông qua bảng lương hàng tháng, hoặc
            thông qua sổ tiết kiệm…)
          </li>
          <li><>✅&nbsp;&nbsp;</>Căn cước công dân còn hiệu lực.</li>
        </ul>
        <p>
          Để làm thẻ tín dụng, khách hàng có thể tới ngân hàng gần
          nhất để được hướng dẫn cụ thể thủ tục.
        </p>
      </Wrapper>
      <Footer />
    </Container>
  );
};
export default ContactShop;
