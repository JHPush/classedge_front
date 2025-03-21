import axios from "axios";

const API_SERVER_HOST = 'http://localhost:8080/api/v1';

export const postLogin = async (form) => {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new URLSearchParams();
    body.append('username', form.id);
    body.append('password', form.password);

    return (await axios.post(`${API_SERVER_HOST}/login`, body, { headers })).data;
};

export const postSignUp = async(form)=>{
    const headers = {'Content-Type': 'application/JSON'};
    
    return (await axios.post(`${API_SERVER_HOST}/signup`, form, {headers})).data;
}

export const getRefresh = async(accessToken, refreshToken)=>{
    const header = {headers:{'Authorization': `Bearer ${accessToken}`}};
    const res = await axios.get(`${API_SERVER_HOST}/refresh?refreshToken=${refreshToken}`, header);
    return res.data;
}


export const checkOverlap = async(field,value)=>{
    const headers = {'Content-Type': 'application/JSON'};
    console.log(`${API_SERVER_HOST}/signup/check/${field}?value=${value}`)
    return (await axios.get(`${API_SERVER_HOST}/signup/check/${field}?value=${value}`, {headers})).data;
}
