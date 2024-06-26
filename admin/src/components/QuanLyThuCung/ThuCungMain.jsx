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

const ThuCungMain = ({ reRenderData, setReRenderData}) => {

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

    // Lấy danh mục
    const [thucung, setThuCung] = useState([]);
    useEffect(() => {
        const getThuCung = async () => {
            try {
                const thucungres = await axios.post("http://localhost:3001/api/products/getThuCung", {});
                setThuCung(thucungres.data);
            } catch (err) {
                console.log("Lỗi lấy thú cưng: ", err);
            }
        }
        getThuCung();
    }, [reRenderData]);
    useEffect(() => {
        const timThuCung = async () => {
            try {
                const ketquares = await axios.post("http://localhost:3001/api/products/findThuCung", { tenthucung: timkiem });
                setThuCung(ketquares.data);
                console.log("Kết quả tìm trong effect: ", ketquares.data);
            } catch (err) {
                console.log("Lỗi tìm kiếm: ", err);
            }
        }
        timThuCung();
        setPageNumber(0);
    }, [timkiem])
    console.log("Thú cưng: ", thucung);

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

    // PHÂN TRANG

    const [pageNumber, setPageNumber] = useState(0);

    const thuCungPerPage = 12;
    const pageVisited = pageNumber * thuCungPerPage;

    const thuCungChuyenTrang = thucung
        .slice(pageVisited, pageVisited + thuCungPerPage)
        .map(thucungitem => {
            return (
                <Tr>
                    <Td>{thucungitem.mathucung}</Td>
                    <Td>{thucungitem.tendanhmuc}</Td>
                    <Td>{thucungitem.tenthucung}</Td>
                    <Td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ImgDanhMuc src={thucungitem.hinhanh} style={{
                            borderRadius: "20%",
                            width: "36px",
                            height: "36px",
                            objectFit: "cover",
                            margin: "5px",
                        }} />
                    </Td>
                    <Td>{thucungitem.soluong}</Td>
                    <Td>{thucungitem.giaban ? format_money((thucungitem.giaban).toString()) : null}</Td>
                    <Td>{thucungitem.giamgia ? format_money((thucungitem.giamgia).toString()) : null}</Td>
                    <Td className="info">
                        <ButtonInfo
                            onClick={() => openModal({ type: "chitietthucung", thucung: thucungitem })}
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
                                            onClick={() => openModal({ type: "chinhsuathucung", thucung: thucungitem })}
                                        >
                                            <DriveFileRenameOutlineOutlined />
                                        </ButtonFix>
                                    </Td>
                                    <Td className="primary">
                                        <ButtonDelete
                                            onClick={() => openModal({ type: "xoathucung", thucung: thucungitem })}
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
                            onClick={() => openModal({ type: "chinhsuathucung", thucung: thucungitem })}
                        >
                            <DriveFileRenameOutlineOutlined />
                        </ButtonFix>
                    </Td>
                    <Td className="primary">
                        <ButtonDelete
                            onClick={() => openModal({ type: "xoathucung", thucung: thucungitem })}
                        >
                            <DeleteSweepOutlined />
                        </ButtonDelete>
                    </Td> */}
                </Tr>
            );
        }
        );


    const pageCount = Math.ceil(thucung.length / thuCungPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    return (
        <Container>
            <H2>Quản lý thú cưng</H2>

            {/* Tìm kiếm */}
            <SearchWrapper className={isSearch ? "active" : null}>
                <InputHolder>
                    <Input ref={InputRef} type="text" placeHolder="Nhập vào mã thú cưng" onChange={(e) => setTimKiem(e.target.value)} />
                    <Button onClick={(e) => { handleSeach(e) }}><Span></Span></Button>
                </InputHolder>
                <CloseSpan onClick={() => { handleClose() }}></CloseSpan>
            </SearchWrapper>

            <RecentOrders>
                <H2>Danh sách thú cưng hiện tại</H2>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Mã thú cưng</Th>
                            <Th>Danh mục</Th>
                            <Th>Tên thú cưng</Th>
                            <Th>Hình ảnh</Th>
                            <Th>Số lượng</Th>
                            <Th>Giá bán</Th>
                            <Th>Giảm giá</Th>
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
                            thucung !== null
                                ?
                                thuCungChuyenTrang
                                :
                                (thucung.slice(0, 12).map(thucungitem => (
                                    <Tr>
                                        <Td>{thucungitem.mathucung}</Td>
                                        <Td>{thucungitem.tendanhmuc}</Td>
                                        <Td>{thucungitem.tenthucung}</Td>
                                        <Td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <ImgDanhMuc src={thucungitem.hinhanh} style={{
                                                borderRadius: "20%",
                                                width: "36px",
                                                height: "36px",
                                                objectFit: "cover",
                                                margin: "5px",
                                            }} />
                                        </Td>
                                        <Td>{thucungitem.soluong}</Td>
                                        <Td>{thucungitem.giaban}</Td>
                                        <Td>{thucungitem.giamgia}</Td>
                                        <Td className="info">
                                            <ButtonInfo
                                                onClick={() => openModal({ type: "chitietthucung", thucung: thucungitem })}
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
                                                                onClick={() => openModal({ type: "chinhsuathucung", thucung: thucungitem })}
                                                            >
                                                                <DriveFileRenameOutlineOutlined />
                                                            </ButtonFix>
                                                        </Td>
                                                        <Td className="primary">
                                                            <ButtonDelete
                                                                onClick={() => openModal({ type: "xoathucung", thucung: thucungitem })}
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
                                                onClick={() => openModal({ type: "chinhsuathucung", thucung: thucungitem })}
                                            >
                                                <DriveFileRenameOutlineOutlined />
                                            </ButtonFix>
                                        </Td>
                                        <Td className="primary">
                                            <ButtonDelete
                                                onClick={() => openModal({ type: "xoathucung", thucung: thucungitem })}
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
                thucung={thuCungModal}  //Dữ liệu bên trong modal
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



export default ThuCungMain;