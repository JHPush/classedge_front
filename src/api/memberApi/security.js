import axios from "axios";

const API_SERVER_HOST = 'http://localhost:8080/api/v1';

// 로그인 요청 (로그인슬라이스에서 사용)
export const postLogin = async (form) => {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new URLSearchParams();
    body.append('username', form.id);
    body.append('password', form.password);

    return (await axios.post(`${API_SERVER_HOST}/login`, body, { headers })).data;
};

// 회원가입
export const postSignUp = async(form)=>{
    const headers = {'Content-Type': 'application/JSON'};
    
    return (await axios.post(`${API_SERVER_HOST}/signup`, form, {headers})).data;
}

// 토큰 갱신 (리덕스에서 응답 받을때 자동으로 호출)
export const getRefresh = async(accessToken, refreshToken)=>{
    const header = {headers:{'Authorization': `Bearer ${accessToken}`}};
    const res = await axios.get(`${API_SERVER_HOST}/refresh?refreshToken=${refreshToken}`, header);
    return res.data;
}

// 중복검사
export const checkOverlap = async(field,value)=>{
    const headers = {'Content-Type': 'application/JSON'};
    console.log(`${API_SERVER_HOST}/signup/check/${field}?value=${value}`)
    return (await axios.get(`${API_SERVER_HOST}/signup/check/${field}?value=${value}`, {headers})).data;
}
