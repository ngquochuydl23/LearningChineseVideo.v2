import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: null,
    isLoading: false,
}

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsLoggedIn: () => {
            state.isLoggedIn = true;
        },
        setLoading: (state) => {
            state.isLoading = true;
        },
        setUser: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        stopLoading: (state) => {
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("lastAccessRoomId");
        },
    }
})

export const { setUser, stopLoading, logout, setLoading, setIsLoggedIn } = slice.actions;
const userReducer = slice.reducer
export default userReducer;
