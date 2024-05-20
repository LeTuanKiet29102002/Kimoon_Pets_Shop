import format_money from "../../utils";
import styled from "styled-components";
import "../../css/main.css";
import { useEffect, useRef, useState } from "react";
import { DeleteSweepOutlined, DriveFileRenameOutlineOutlined, RemoveRedEyeOutlined } from "@mui/icons-material";
import axios from "axios";
import Modal from "./Modal";
import Toast from "./Toast";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const Container = styled.div`
    margin-top: 1.4rem;
`

// Recent Orders
const RecentOrders = styled.div`
    margin-top: 3.3rem;
`

const H2 = styled.h2`
    margin-bottom: 0.8rem;
`

const Table = styled.table`
    background: var(--color-white);
    width: 100%;
    border-radius: var(--card-border-radius);
    padding: var(--card-padding);
    text-align: center;
    box-shadow: var(--box-shadow);
    transition: all 300ms ease;
    &:hover {
        box-shadow: none;
    }
`

const Thead = styled.thead`

`

const Tr = styled.tr`
    &:last-child td {
        border: none;
    }
    &:hover {
        background: var(--color-light);
    }
`

const Th = styled.th`

`

const Tbody = styled.tbody`

`

const Td = styled.td`
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
`

const A = styled.a`
    text-align: center;
    display: block;
    margin: 1rem auto;
    color: var(--color-primary);
`

// Tìm kiếm
const SearchWrapper = styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 12%;
    left: 57%;
    box-shadow: var(--box-shadow);
    &.active {
        box-shadow: none;
    }
`

const InputHolder = styled.div`
    height: 50px;
    width: 50px;
    overflow: hidden;
    background: rgba(255,255,255,0);
    border-radius: 6px;
    position: relative;
    transition: all 0.3s ease-in-out;
    ${SearchWrapper}.active & {
        width:450px;
        border-radius: 50px;
        background: var(--color-light);
        transition: all .5s cubic-bezier(0.000, 0.105, 0.035, 1.570);
    }
`

const Input = styled.input`
    width: 100%;
    height: 30px;
    padding: 0px 50px 0 20px;
    opacity: 0;
    position: absolute;
    top: 0px;
    left: 0px;
    background: transparent;
    box-sizing: border-box;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: var(--color-dark);
    transform: translate(0, 60px);
    transition: all .3s cubic-bezier(0.000, 0.105, 0.035, 1.570);
    transition-delay: 0.3s;
    ${SearchWrapper}.active & {
        opacity: 1;
        transform: translate(0, 10px);
    }
`

const Label = styled.label`

`


const Button = styled.button`
    width: 50px;
    height: 50px;
    border:none;
    border-radius:6px;
    background: var(--color-primary);
    padding:0px;
    outline:none;
    position: relative;
    z-index: 2;
    float:right;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    ${SearchWrapper}.active & {
        width: 40px;
        height: 40px;
        margin: 5px;
        border-radius: 30px;
    }
`

const Span = styled.span`
    width:22px;
    height:22px;
    display: inline-block;
    vertical-align: middle;
    position:relative;
    transform: rotate(45deg);
    transition: all .4s cubic-bezier(0.650, -0.600, 0.240, 1.650);
    ${SearchWrapper}.active & {
        transform: rotate(-45deg);
    }
    &::before {
        position: absolute; 
        content:'';
        width: 4px;
        height: 11px;
        left: 9px;
        top: 18px;
        border-radius: 2px;
        background: var(--color-white);
    }
    &::after {
        position: absolute; 
        content:'';
        width: 14px;
        height: 14px;
        left: 0px;
        top: 0px;
        border-radius: 16px;
        border: 4px solid var(--color-white);
    }
    .search-wrapper .close {
        position: absolute;
        z-index: 1;
        top:24px;
        right:20px;
        width:25px;
        height:25px;
        cursor: pointer;
        transform: rotate(-180deg);
        transition: all .3s cubic-bezier(0.285, -0.450, 0.935, 0.110);
        transition-delay: 0.2s;
    }

`


const CloseSpan = styled.span`
    position: absolute;
    z-index: 1;
    top: 15px;
    right: 20px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    transform: rotate(-180deg);
    transition: all .3s cubic-bezier(0.285, -0.450, 0.935, 0.110);
    transition-delay: 0.2s;
    &::before {
        position: absolute;
        content:'';
        background: var(--color-primary);
        border-radius: 2px;
        width: 5px;
        height: 25px;
        left: 10px;
        top: 0px;
    }
    &::after {
        position: absolute;
        content:'';
        background: var(--color-primary);
        border-radius: 2px;
        width: 25px;
        height: 5px;
        left: 0px;
        top: 10px;
    }
    ${SearchWrapper}.active & {
        right:-50px;
        transform: rotate(45deg);
        transition: all .6s cubic-bezier(0.000, 0.105, 0.035, 1.570);
        transition-delay: 0.5s;
    }
`

const ButtonFix = styled.button`
    width: 40px;
    height: 30px;
    border: 2px solid var(--color-warning);
    border-radius: var(--border-radius-2);
    color: var(--color-warnning);
    background: var(--color-white);
    padding:0px;
    outline:none;
    z-index: 2;
    cursor: pointer;
`

const ButtonInfo = styled.button`
    width: 40px;
    height: 30px;
    border: 2px solid var(--color-info);
    border-radius: var(--border-radius-2);
    color: var(--color-warnning);
    background: var(--color-white);
    padding:0px;
    outline:none;
    z-index: 2;
    cursor: pointer;
`

const ButtonDelete = styled.button`
width: 40px;
height: 30px;
border: 2px solid var(--color-danger);
border-radius: var(--border-radius-2);
color: var(--color-danger);
background: var(--color-white);
padding:0px;
outline:none;
z-index: 2;
cursor: pointer;
`

const ImgDanhMuc = styled.img`
    width: auto;
    height: 100%;
    object-fit: contain;
`

const ThuCungLacMain = ({ reRenderData, setReRenderData }) => {
    // Lấy admin từ Redux
    const admin = useSelector((state) => state.admin.currentAdmin);

    const InputRef = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [timkiem, setTimKiem] = useState("");
    const handleSeach = (e) => {
        if (isSearch === false) {
            setIsSearch(!isSearch);
            e.preventDefault();
        } else {
            // Thực hiện tìm kiếm
            console.log(timkiem);
        }
    }
    const handleClose = () => {
        setIsSearch(false);
        InputRef.current.value = "";
        console.log(InputRef.current.value);
        setTimKiem("");
    }

    // Lấy thú lạc
    const [thulac, setThuCungLac] = useState([]);
    useEffect(() => {
        const getThuCungLac = async () => {
            try {
                const thulacres = await axios.post("http://localhost:3001/api/lostpets/getThuCungLac", {});
                console.log("check thu cung lac: ", thulacres);

                setThuCungLac(thulacres.data);
            } catch (err) {
                console.log("Lỗi lấy thú cưng lạc: ", err);
            }
        }
        getThuCungLac();
    }, [reRenderData]);
    useEffect(() => {
        const timThuCungLac = async () => {
            try {
                const ketquares = await axios.post("http://localhost:3001/api/lostpets/findThuCungLac", { tenthulac: timkiem });
                setThuCungLac(ketquares.data);
                console.log("Kết quả tìm trong effect: ", ketquares.data);
            } catch (err) {
                console.log("Lỗi tìm kiếm: ", err);
            }
        }
        timThuCungLac();
        setPageNumber(0);
    }, [timkiem])
    console.log("Thú cưng lạc: ", thulac);

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState("")
    const [thuLacModal, setThuLacModal] = useState(null);

    const openModal = (modal) => {
        setShowModal(prev => !prev);
        setTypeModal(modal.type);
        setThuLacModal(modal.thulac);
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

    // PHÂN TRANG

    const [pageNumber, setPageNumber] = useState(0);

    const thuCungPerPage = 12;
    const pageVisited = pageNumber * thuCungPerPage;

    const thuCungChuyenTrang = thulac
        .slice(pageVisited, pageVisited + thuCungPerPage)
        .map(thulacitem => {
            return (
                <Tr>
                    <Td>{thulacitem.mathulac}</Td>
                    <Td>{thulacitem.tenthulac}</Td>
                    <Td>{thulacitem.hotennguoimua}</Td>
                    <Td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ImgDanhMuc src={thulacitem.hinhdaidien} style={{
                            borderRadius: "20%",
                            width: "36px",
                            height: "36px",
                            objectFit: "cover",
                            margin: "5px",
                        }} />
                    </Td>
                    <Td>{thulacitem.sdtlienhe?thulacitem.sdtlienhe:thulacitem.sdtnguoimua}</Td>
                    <Td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ImgDanhMuc src={thulacitem.hinhanhthulac} style={{
                            borderRadius: "20%",
                            width: "36px",
                            height: "36px",
                            objectFit: "cover",
                            margin: "5px",
                        }} />
                    </Td>
                    {
                        thulacitem.tentrangthaithucung === "Chờ duyệt"
                            ?
                            <Td style={{ backgroundColor: "var(--color-warning)" }}>{thulacitem.tentrangthaithucung}</Td>
                            :
                            thulacitem.tentrangthaithucung === "Đang duyệt"
                                ?
                                <Td style={{ backgroundColor: "var(--color-info)" }}>{thulacitem.tentrangthaithucung}</Td>
                                :
                                thulacitem.tentrangthaithucung === "Đã duyệt"
                                    ?
                                    <Td style={{ backgroundColor: "var(--color-success)" }}>{thulacitem.tentrangthaithucung}</Td>
                                    :
                                    thulacitem.tentrangthaithucung === "Đã hủy"
                                        ?
                                        <Td style={{ backgroundColor: "var(--color-danger)" }}>{thulacitem.tentrangthaithucung}</Td>
                                        : null
                    }
                    <Td className="info">
                        <ButtonInfo
                            onClick={() => openModal({ type: "chitietthulac", thulac: thulacitem })}
                        >
                            <RemoveRedEyeOutlined />
                        </ButtonInfo>
                    </Td>
                    {
                        admin
                            ?
                            // Chỉ admin với nv bán hàng mới được chỉnh sửa và xóa thú cưng
                            admin.machucvu === 5 || admin.machucvu === 1
                                ?
                                <>
                                    <Td className="warning">
                                        <ButtonFix
                                            onClick={() => openModal({ type: "chinhsuathulac", thulac: thulacitem })}
                                        >
                                            <DriveFileRenameOutlineOutlined />
                                        </ButtonFix>
                                    </Td>
                                    <Td className="primary">
                                        <ButtonDelete
                                            onClick={() => openModal({ type: "xoathulac", thulac: thulacitem })}
                                        >
                                            <DeleteSweepOutlined />
                                        </ButtonDelete>
                                    </Td>
                                </>
                                : null
                            : null
                    }
                    {/* <Td className="warning">
                        <ButtonFix
                            onClick={() => openModal({ type: "chinhsuathucung", thulac: thulacitem })}
                        >
                            <DriveFileRenameOutlineOutlined />
                        </ButtonFix>
                    </Td>
                    <Td className="primary">
                        <ButtonDelete
                            onClick={() => openModal({ type: "xoathucung", thulac: thulacitem })}
                        >
                            <DeleteSweepOutlined />
                        </ButtonDelete>
                    </Td> */}
                </Tr>
            );
        }
        );


    const pageCount = Math.ceil(thulac.length / thuCungPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    return (
        <Container>
            <H2>Quản lý thú cưng lạc</H2>

            {/* Tìm kiếm */}
            <SearchWrapper className={isSearch ? "active" : null}>
                <InputHolder>
                    <Input ref={InputRef} type="text" placeHolder="Nhập vào mã thú cưng lạc" onChange={(e) => setTimKiem(e.target.value)} />
                    <Button onClick={(e) => { handleSeach(e) }}><Span></Span></Button>
                </InputHolder>
                <CloseSpan onClick={() => { handleClose() }}></CloseSpan>
            </SearchWrapper>

            <RecentOrders>
                <H2>Danh sách thú cưng lạc hiện tại</H2>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Mã thú cưng lạc</Th>
                            <Th>Tên thú cưng lạc</Th>
                            <Th>Tên chủ</Th>
                            <Th>Hình đại diện</Th>
                            <Th>SĐT liên hệ</Th>
                            <Th>Hình thú lạc</Th>
                            <Th>Trạng thái thú cưng</Th>
                            <Th>Chi tiết</Th>
                            {
                                admin
                                    ?
                                    // Chỉ admin với nv bán hàng mới được chỉnh sửa và xóa thú cưng
                                    admin.machucvu === 5 || admin.machucvu === 1
                                        ?
                                        <>
                                            <Th>Chỉnh sửa</Th>
                                            <Th>Xóa</Th>
                                        </>
                                        : null
                                    : null
                            }
                            {/* <Th>Chỉnh sửa</Th>
                            <Th>Xóa</Th> */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            thulac !== null
                                ?
                                thuCungChuyenTrang
                                :
                                (thulac.slice(0, 12).map(thulacitem => (
                                    <Tr>
                                        <Td>{thulacitem.mathulac}</Td>
                                        <Td>{thulacitem.tenthulac}</Td>
                                        <Td>{thulacitem.hotennguoimua}</Td>
                                        <Td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <ImgDanhMuc src={thulacitem.hinhdaidien} style={{
                                                borderRadius: "20%",
                                                width: "36px",
                                                height: "36px",
                                                objectFit: "cover",
                                                margin: "5px",
                                            }} />
                                        </Td>
                                        <Td>{thulacitem.sdtlienhe?thulacitem.sdtlienhe:thulacitem.sdtnguoimua}</Td>
                                        <Td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <ImgDanhMuc src={thulacitem.hinhanhthulac} style={{
                                                borderRadius: "20%",
                                                width: "36px",
                                                height: "36px",
                                                objectFit: "cover",
                                                margin: "5px",
                                            }} />
                                        </Td>
                                        {
                                            thulacitem.tentrangthaithucung === "Chờ duyệt"
                                                ?
                                                <Td style={{ backgroundColor: "var(--color-warning)" }}>{thulacitem.tentrangthaithucung}</Td>
                                                :
                                                thulacitem.tentrangthaithucung === "Đang duyệt"
                                                    ?
                                                    <Td style={{ backgroundColor: "var(--color-info)" }}>{thulacitem.tentrangthaithucung}</Td>
                                                    :
                                                    thulacitem.tentrangthaithucung === "Đã duyệt"
                                                        ?
                                                        <Td style={{ backgroundColor: "var(--color-success)" }}>{thulacitem.tentrangthaithucung}</Td>
                                                        :
                                                        thulacitem.tentrangthaithucung === "Đã hủy"
                                                            ?
                                                            <Td style={{ backgroundColor: "var(--color-danger)" }}>{thulacitem.tentrangthaithucung}</Td>
                                                            : null
                                        }
                                        <Td className="info">
                                            <ButtonInfo
                                                onClick={() => openModal({ type: "chitietthulac", thulac: thulacitem })}
                                            >
                                                <RemoveRedEyeOutlined />
                                            </ButtonInfo>
                                        </Td>
                                        {
                                            admin
                                                ?
                                                // Chỉ admin với nv bán hàng mới được chỉnh sửa và xóa thú cưng
                                                admin.machucvu === 5 || admin.machucvu === 1
                                                    ?
                                                    <>
                                                        <Td className="warning">
                                                            <ButtonFix
                                                                onClick={() => openModal({ type: "chinhsuathulac", thulac: thulacitem })}
                                                            >
                                                                <DriveFileRenameOutlineOutlined />
                                                            </ButtonFix>
                                                        </Td>
                                                        <Td className="primary">
                                                            <ButtonDelete
                                                                onClick={() => openModal({ type: "xoathulac", thulac: thulacitem })}
                                                            >
                                                                <DeleteSweepOutlined />
                                                            </ButtonDelete>
                                                        </Td>
                                                    </>
                                                    : null
                                                : null
                                        }

                                        {/* <Td className="warning">
                                            <ButtonFix
                                                onClick={() => openModal({ type: "chinhsuathucung", thulac: thulacitem })}
                                            >
                                                <DriveFileRenameOutlineOutlined />
                                            </ButtonFix>
                                        </Td>
                                        <Td className="primary">
                                            <ButtonDelete
                                                onClick={() => openModal({ type: "xoathucung", thulac: thulacitem })}
                                            >
                                                <DeleteSweepOutlined />
                                            </ButtonDelete>
                                        </Td> */}
                                    </Tr>
                                )))
                        }
                    </Tbody>
                </Table>
                <ReactPaginate
                    previousLabel={"PREVIOUS"}
                    nextLabel={"NEXT"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                    nextClassName={"nextClassName"}
                    pageLinkClassName={"pageLinkClassName"}
                    forcePage={pageNumber}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                />

            </RecentOrders>
            <Modal
                showModal={showModal}   //state Đóng mở modal
                setShowModal={setShowModal} //Hàm Đóng mở modal
                type={typeModal}    //Loại modal
                thulac={thuLacModal}  //Dữ liệu bên trong modal
                setReRenderData={setReRenderData}   //Hàm rerender khi dữ liệu thay đổi
                handleClose={handleClose}   //Đóng tìm kiếm
                showToastFromOut={showToastFromOut} //Hàm hiện toast
            />

            {/* === TOAST === */}
            <Toast
                ref={toastRef}
                dataToast={dataToast}   // Thông tin cần hiện lên: Đối tượng { message,type }
            />
        </Container>
    );
};



export default ThuCungLacMain;