import jwtAxios from "../../utils/jwtUtils";


const API_SERVER_HOST = 'http://localhost:8080/api/v1';

export const getOriginNotifications = async(email)=>{
    const headers = {'Content-Type': 'application/JSON'};
    
    return (await jwtAxios.get(`${API_SERVER_HOST}/notify?email=${email}`, {headers})).data;
}

export const updateReadNotifications = async(email)=>{
    const headers = {'Content-Type': 'application/JSON'};
    
    return (await jwtAxios.put(`${API_SERVER_HOST}/notify?email=${email}`, {headers})).data;
}