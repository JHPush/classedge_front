import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getCookie, removeCookie, setCookie } from "../utils/cookieUtils";
import { postLogin } from "../api/memberApi/security";

const initState = {
    id: "",
    nickname:"",
    memberName:"",
    loginType:"",
    email:"",
    role:""
}

// 액션 타입, 비동기 처리 함수
export const loginPostAsync = createAsyncThunk('loginSlicer/loginPostAsync', async (param) => {
    const res = await postLogin(param);
    return res; // Promise 객체 리턴
})

const cookie = getCookie('member');

const loginSlicer = createSlice({
    name: "loginSlicer",
    initialState: cookie ? {initState:{id: cookie.id, nickname: cookie.nickname, memberName: cookie.memberName, loginType: cookie.loginType, email: cookie.email, role: cookie.role}} : initState,
    reducers: {
        login: (state, action) => { // state : 현재 상태 정보 / action - 전달받은 액션 객체
            return { initState: action.payload };
        },
        logout: () => {
            removeCookie('member')
            return { initState: '' };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginPostAsync.pending, (state, action) => {
                console.log('extra reduce loginPostAsync.pending...');
            })
            .addCase(loginPostAsync.fulfilled, (state, action) => {
                console.log('extra reduce loginPostAsync.fulfilled...');
                console.log('fulfilled payload', action.payload);

                if(!action.payload.error)
                setCookie('member', JSON.stringify(action.payload), 1)

                return { initState: action.payload };
            })
            .addCase(loginPostAsync.rejected, (state, action) => {
                console.log('extra reduce loginPostAsync.rejected...');
            })
    }
})

export const { login, logout } = loginSlicer.actions; // 액션 생성 함수
export default loginSlicer.reducer; // 슬라이스의 리듀서를 기본값으로 내보냄 - 리덕스 스토어에 등록하여 상태관리 수행