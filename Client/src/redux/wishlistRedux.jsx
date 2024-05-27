import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        products: [],
        soluongyeuthich: 0,
    },
    reducers: {
        themSanPhamYeuThich: (state, action) => {
            const { data } = action.payload;
            const mathucung = parseInt(data[0].mathucung);
            const existingProductIndex = state.products.findIndex(product => product.data[0].mathucung === mathucung);

            if (existingProductIndex === -1) {
                state.products.push(action.payload);
                state.soluongyeuthich += 1;
                console.log("Thêm vào danh sách yêu thích thành công");
            } else {
                console.log("Sản phẩm đã có trong danh sách yêu thích");
            }
        },
        xoaSanPhamYeuThich: (state, action) => {
            const mathucung = parseInt(action.payload.mathucung);
            const productIndex = state.products.findIndex(product => product.data[0].mathucung === mathucung);

            if (productIndex >= 0) {
                state.products.splice(productIndex, 1);
                state.soluongyeuthich -= 1;
                console.log("Xóa sản phẩm khỏi danh sách yêu thích thành công");
            } else {
                console.log("Không tìm thấy sản phẩm trong danh sách yêu thích");
            }
        },
        capNhatSanPhamYeuThich: (state, action) => {
            const { data } = action.payload;
            const mathucung = parseInt(data[0].mathucung);
            const existingProductIndex = state.products.findIndex(product => product.data[0].mathucung === mathucung);

            if (existingProductIndex >= 0) {
                state.products[existingProductIndex] = action.payload;
                console.log("Cập nhật sản phẩm trong danh sách yêu thích thành công");
            } else {
                console.log("Không tìm thấy sản phẩm trong danh sách yêu thích");
            }
        },

        capNhatSoLuongYeuThich: (state, action) => {
            return {
                ...state,
                soluongyeuthich: state.soluongyeuthich - 1,
                products: state.products.filter(product => product.data[0].mathucung !== action.payload.data[0].mathucung),
            };
        },
        
        logoutWishlist: (state) => {
            state.products = [];
            state.soluongyeuthich = 0;
            console.log("Đăng xuất và làm trống danh sách yêu thích thành công");
        }
    }
});

export const { themSanPhamYeuThich, xoaSanPhamYeuThich, capNhatSanPhamYeuThich,capNhatSoLuongYeuThich, logoutWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
