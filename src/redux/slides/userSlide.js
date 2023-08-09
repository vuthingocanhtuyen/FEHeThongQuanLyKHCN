import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    QuanNhanId: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
    id: '',
    isAdmin: 'user',
    city: '',
    refreshToken: ''
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = '', QuanNhanId = '', email = '', access_token = '', address = '', phone = '', avatar = '', _id = '', isAdmin,city= '',refreshToken = '' } = action.payload
            state.name = name ? name : state.name;
            state.QuanNhanId = QuanNhanId ? QuanNhanId : state.QuanNhanId;
            state.email = email ? email : state.email;
            state.address = address ? address : state.address;
            state.phone = phone ? phone : state.phone;
            state.avatar = avatar ? avatar : state.avatar;
            state.id = _id ? _id : state.id
            state.access_token = access_token ? access_token : state.access_token;
            state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
            state.city = city ? city : state.city;
            state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
        },
        resetUser: (state) => {
            state.name = '';
            state.QuanNhanId = '';
            state.email = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.id = '';
            state.access_token = '';
            state.isAdmin = 'user';
            state.city = '';
            state.refreshToken = ''
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer