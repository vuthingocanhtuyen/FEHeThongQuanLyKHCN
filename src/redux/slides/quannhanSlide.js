import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: '',
    hoten: '',
    ngaysinh: '',
    gioitinh: '',
    quequan: '',
    diachi: '',
    sdt: '',
    email: '',
    hoatdong: '',
    loaiqn: '',
    access_token: '',
    id: '',
    isAdmin: 'user',
    city: '',
    refreshToken: ''
}

export const quannhanSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateQuanNhan: (state, action) => {
            const { id = '', hoten = '', email = '', access_token = '', address = '', sdt = '', diachi = '', _id = '', isAdmin, quequan = '', refreshToken = '' } = action.payload
            state.hoten = hoten ? hoten : state.hoten;
            state.id = id ? id : state.id;
            state.email = email ? email : state.email;
            state.diachi = diachi ? diachi : state.diachi;
            // state.phone = phone ? phone : state.phone;
            // state.avatar = avatar ? avatar : state.avatar;
            state.id = _id ? _id : state.id
            state.access_token = access_token ? access_token : state.access_token;
            state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
            // state.city = city ? city : state.city;
            state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
        },
        resetQuanNhan: (state) => {
            state.hoten = '';
            state.id = '';
            state.email = '';
            state.diachi = '';
            // state.phone = '';
            // state.avatar = '';
            state.id = '';
            state.access_token = '';
            state.isAdmin = 'user';
            //state.city = '';
            state.refreshToken = ''
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateQuanNhan, resetQuanNhan } = quannhanSlide.actions

export default quannhanSlide.reducer