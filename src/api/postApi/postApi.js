
import jwtAxios from "../../utils/jwtUtils";

const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/v1`;


export const getPostBoard = async (limit) => {
    console.log('limit : ', limit);
    const res = await jwtAxios.get(`${prefix}/posts?limit=${limit}`);  //posts?limit=5
    return res.data;
}
export const getComment = async (id) => {
    const res = await jwtAxios.get(`${prefix}/comments/${id}`)
    console.log("res: ", res);
    return res.data;
}

//댓글등록
export const postComment = async(comment, files) =>{

    const formData = new FormData();

    // Blob을 사용하여 JSON 데이터를 추가해야 함
    const jsonBlob = new Blob([JSON.stringify(comment)], { type: 'application/json' });
    formData.append('commentDto', jsonBlob);  // postDto를 Blob으로 변환 후 추가

    // 파일 추가
    const fileArr = [...files]
    if(fileArr != null && fileArr.length >0)
    fileArr.forEach((file) => {
        formData.append('files', file);
    });

    // 요청 보내기
    const res = await jwtAxios.post(`${prefix}/comments/register`, formData, {
        headers: {
            // 'Content-Type'을 지정하지 않음 (자동 설정)
        }}
    )


    return res;
}


//게시글등록
export const registerPost = async (post, files) => {
    const formData = new FormData();

    // Blob을 사용하여 JSON 데이터를 추가해야 함
    const jsonBlob = new Blob([JSON.stringify(post)], { type: 'application/json' });
    formData.append('postDto', jsonBlob);  // postDto를 Blob으로 변환 후 추가

    // 파일 추가
    const fileArr = [...files]
    if(fileArr != null && fileArr.length >0)
    fileArr.forEach((file) => {
        formData.append('files', file);
    });

    // 요청 보내기
    const response = await jwtAxios.post(`${prefix}/posts/register`, formData, {
        headers: {
            // 'Content-Type'을 지정하지 않음 (자동 설정)
        }}
    )
    
    return response.data;
};


//게시글삭제
export const deletePost = async (id) => {
    const res = await jwtAxios.delete(`${prefix}/posts/${id}`)
    return res.data
}

//게시글수정
export const putPost =async(post) =>{
    const res = await jwtAxios.put(`${prefix}/posts/${post.id}`, post)
    return res.data
}


//댓글삭제
export const deleteComment = async (id) => {
    const res = await jwtAxios.delete(`${prefix}/comments/${id}`)
    return res.data
}

//댓글수정
export const putComment =async(comment) =>{
    const res = await jwtAxios.put(`${prefix}/comments/${comment.id}`, comment)
    return res.data
}


//파일다운로드
export const downloadFile = async (id) => {
    const res = await jwtAxios.get(`${prefix}/files/download?value=${id}`, { responseType: 'blob' })
    return res.data;
}


// 게시글 상세조회
export const getPost = async (id) => {
    const res = await jwtAxios.get(`${prefix}/posts/${id}`)
    console.log("res: ", res);
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

    const res = await jwtAxios.get(`${prefix}/posts/search`, { params: { keyfield, keyword, boardName, page, size } });  //posts?page=1&size=10

    return res.data;
}


//파일 삭제
export const deleteFile = async(id) =>{
    const res = await jwtAxios.delete(`${prefix}/files/delete?value=${id}`)
    console.log('Deleting file at: ', `/${prefix}/files/delete?value=${id}`);
    return res.data
}
