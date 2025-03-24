import axios from "axios";
import { getCookie, setCookie } from "./cookieUtils";
import { getRefresh } from "../api/memberApi/security";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {

}

const beforeReq = (config) => { // config : request 전송시 데이터
    console.log("before Request....")
    const memberInfo = getCookie('member');

    if (!memberInfo) {
        console.error('Member Not Found...')
        return Promise.reject({
            response: { data: { error: 'REQUIRED_LOGIN' } }
        })
    }
    const { accessToken } = memberInfo;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
}
const requestFail = (error) => {
    console.log("before Request Failed....")
    console.log("error : ", error);
    return Promise.reject(error);

}
const beforeRes = async (res) => { 
    console.log("before Response ....")
    console.log("res : ", res)

    const data = res.data;
    if (data && data.error === 'ERROR_ACCESS_TOKEN') {
        const memberCookie = getCookie('member')
        getRefresh(memberCookie.accessToken, memberCookie.refreshToken)
            .then(data => {
                console.log("data : ", data);
                memberCookie.accessToken = data.accessToken;
                memberCookie.refreshToken = data.refreshToken;
                setCookie('member', JSON.stringify(memberCookie), 1);

                const originReqeusst = res.config; // 기존 리퀘스트 정보 가져옴
                originReqeusst.headers.Authorization = data.accessToken;

                return axios(originReqeusst);

            })
            .catch(e => {
                console.error("Error in beforeRes from jws Utils : ", e);
            })

    }
    return res;

}
const responseFail = (error) => {
    console.error("responseFail : ", error)
    return Promise.reject(error);
}

// 인터셉터 등록
jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;