import jwtAxios from "../../utils/jwtUtils";


const API_SERVER_HOST = 'http://localhost:8080/api/v1';

// DB의 알람 가져오기
export const getOriginNotifications = async(email)=>{
    return (await jwtAxios.get(`${API_SERVER_HOST}/notify?email=${email}`)).data;
}

// DB 알람 수정 (읽음처리)
export const updateReadNotifications = async(email)=>{
    return (await jwtAxios.put(`${API_SERVER_HOST}/notify?email=${email}`)).data;
}