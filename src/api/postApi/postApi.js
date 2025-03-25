
import jwtAxios from "../../utils/jwtUtils";

const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/v1`;


export const getPostBoard = async (limit) => { 
    console.log('limit : ', limit);
    const res = await jwtAxios.get(`${prefix}/posts`, { params: {limit} });  //posts?limit=5
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


export const uploadFile =async(file, postId) =>{
    const formData = new FormData();

    formData.append('file', file);
    formData.append('postId', postId);

    const res = await jwtAxios.post(`${prefix}/files/upload`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    return res.data;
}

// 게시글 상세조회
export const getPost = async(id) =>{
    const res = await jwtAxios.get(`${prefix}/posts/${id}`)
    console.log("res: " ,res);
    return res.data;
}

// 게시글 등록
export const postPost = async (post) => {
    const res = await jwtAxios.post(`${prefix}/posts`, post);
    console.log("res : ", res);
    return res.data;
}

// 게시글 목록 조회
export const getPosts = async (pageParam) => { // { page: 1, size: 10, keyfield: 'title', keyword: '제목' }
    const { page, size, keyfield, keyword, boardName } = pageParam;

    console.log('page : ', page);
    console.log('size : ', size);
    console.log('keyfield : ', keyfield);
    console.log('keyword : ', keyword);
    console.log('boardName : ', boardName);

    const res = await jwtAxios.get(`${prefix}/posts/search`, { params: {  keyfield, keyword, boardName, page, size } });  //posts?page=1&size=10

    return res.data;
}

