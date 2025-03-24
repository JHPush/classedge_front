
import jwtAxios from "../../utils/jwtUtils";

const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/v1`;

export const getPost = async(id) =>{

  
    const res = await jwtAxios.get(`${prefix}/posts/${id}`)
    console.log("res: " ,res);
    return res.data;
   
    
}


export const getComment = async(id) =>{
    const res = await jwtAxios.get(`${prefix}/comments/${id}`)
    console.log("res: " ,res);
    return res.data;
}


export const postComment = async(comment) =>{
    
    const res = await jwtAxios.post(`${prefix}/comments/register`, comment)
    return res.data;
    

}


export const downloadFile = async(id) =>{
    const res = await jwtAxios.get(`${prefix}/files/download/${id}`, {responseType:'blob'})
    return res.data;
}

export const registerPost = async (post) => {

      const response = await jwtAxios.post(`${prefix}/posts/register`, post);
      return response.data;
    
  }


export const uploadFile =async(id) =>{
    const res = await jwtAxios.get(`${prefix}/files/upload`, {responseType:'blob'})
    return res.data;
}