import { API_PREFIX_DOCKER } from "../../utils/globalVariable";
import jwtAxios from "../../utils/jwtUtils";

const API_SERVER_HOST = `http://${API_PREFIX_DOCKER}/api/v1`;

// 모든 사용자 목록 가져오기
export const getAllMembers = async()=>{
    return (await jwtAxios.get(`${API_SERVER_HOST}/admin/found`)).data;
}

// 회원의 탈퇴 여부 결정하기
export const putMember = async(email) => {
    return (await jwtAxios.put(`${API_SERVER_HOST}/admin/members?value=${email}`)).data;
}

// 학생 사용자를 강사 사용자로 바꾸기
export const putStudentToProfessor = async(email) => {
    return (await jwtAxios.put(`${API_SERVER_HOST}/admin/assign-professor?value=${email}`)).data;
}