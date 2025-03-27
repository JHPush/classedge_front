import jwtAxios from "../../utils/jwtUtils";

const API_SERVER_HOST = 'http://localhost:8080/api/v1';

// DB의 알람 가져오기
export const getAllMembers = async()=>{
    return (await jwtAxios.get(`${API_SERVER_HOST}/admin/found`)).data;
}


export const putMember = async(email)=>{
    return (await jwtAxios.put(`${API_SERVER_HOST}/admin/members?value=${email}`)).data;
}
