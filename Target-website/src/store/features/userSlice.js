// store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userInfo: {
    sub: '',
    name: '',
    profile: '',
    locale: '',
    email: '',
    picture: '',
    website: '',
    gender: '',
    birthdate: '',
    nickname: '',
    preferred_username: '',
    given_name: '',
    middle_name: '',
    family_name: '',
    zoneinfo: '',
    groups: [],
    updated_at: 0,
    email_verified: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      // console.log(state.userInfo);
      // state.userInfo.role = action.payload.groups ? action.payload.groups : 'user';
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = {
        sub: '',
        name: '',
        profile: '',
        locale: '',
        email: '',
        picture: '',
        website: '',
        gender: '',
        birthdate: '',
        nickname: '',
        preferred_username: '',
        given_name: '',
        middle_name: '',
        family_name: '',
        zoneinfo: '',
        updated_at: 0,
        email_verified: false,
        groups: [],
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

