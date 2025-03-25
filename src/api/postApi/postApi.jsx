
import jwtAxios from "../../utils/jwtUtils";

const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/v1`;


//게시글 조회
export const getPost = async(id) =>{

    const res = await jwtAxios.get(`${prefix}/posts/${id}`)
    console.log("res: " ,res);
    return res.data;
}

//댓글조회
export const getComment = async(id) =>{
    const res = await jwtAxios.get(`${prefix}/comments/${id}`)
    console.log("res: " ,res);
    return res.data;
}

//댓글등록
export const postComment = async(comment) =>{
    
    const res = await jwtAxios.post(`${prefix}/comments/register`, comment)
    return res.data;
}


//게시글등록
export const registerPost = async (post) => {

      const response = await jwtAxios.post(`${prefix}/posts/register`, post);
      return response.data;
}


//게시글삭제
export const deletePost = async(id) =>{
    const res = await jwtAxios.delete(`${prefix}/posts/${id}`)
    return res.data
}


//댓글삭제
export const deleteComment = async(id) =>{
    const res = await jwtAxios.delete(`${prefix}/comments/${id}`)
    return res.data
}



//파일다운로드
export const downloadFile = async(id) =>{
    const res = await jwtAxios.get(`${prefix}/files/download/${id}`, {responseType:'blob'})
    return res.data;
}


//파일업로드
export const uploadFile =async(files, postId, commentId) =>{

    const formData = new FormData();

    Array.from(files).forEach((file) => {formData.append('files', file);})
    if (postId !== null) {
    formData.append('postId', postId);
    }
    //게시글 작성시 commentid가 null인 경우 방지 
    if ( commentId !== null) {
    formData.append('commentId', commentId);
    }

    const res = await jwtAxios.post(`${prefix}/files/upload`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    return res.data;
}


//파일 삭제
export const deleteFile = async(id) =>{
    const res = await jwtAxios.delete(`${prefix}/files/${id}`)
    return res.data
}