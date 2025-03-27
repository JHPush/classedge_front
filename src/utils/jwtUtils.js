import axios from "axios";
import { getCookie, setCookie } from "./cookieUtils";
import { getRefresh } from "../api/memberApi/security";

const jwtAxios = axios.create();

const beforeReq = (config) => { // config : request 전송시 데이터
    const memberInfo = getCookie('member');

    if (!memberInfo) {
        return Promise.reject({
            response: { data: { error: 'REQUIRED_LOGIN' } }
        })
    }
    const { accessToken } = memberInfo;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
}
const requestFail = (error) => {
    console.log("Request failed - error : ", error);
    return Promise.reject(error);

}
const beforeRes = async (res) => { 
    const data = res.data;
    if (data && data.error === 'ERROR_ACCESS_TOKEN') { 
        const memberCookie = getCookie('member');
        return getRefresh(memberCookie.accessToken, memberCookie.refreshToken)
            .then(newTokens => {
                console.log("newTokens : ", newTokens);

                // 쿠키 업데이트
                memberCookie.accessToken = newTokens.accessToken;
                memberCookie.refreshToken = newTokens.refreshToken;
                setCookie('member', JSON.stringify(memberCookie), 1);

                // 기존 요청을 재전송
                const originRequest = res.config;
                originRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

                return axios(originRequest);
            })
            .catch(e => {
                console.error("Error in beforeRes from jwtUtils : ", e);
                return Promise.reject(e);
            });
    }
    
    return res; // 토큰 만료가 아닐 경우 원래 응답 반환
};

const responseFail = (error) => {
    console.error("responseFail : ", error)
    return Promise.reject(error);
}

// 인터셉터 등록
jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;