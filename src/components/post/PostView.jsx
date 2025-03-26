import React,{ useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../../api/postApi/postApi";
import FileDownload from "./FileDownload";
import "./postCss/PostView.css"
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import PostDelete from "./PostDelete";
import { useSelector } from "react-redux";



const initialState = {
  id: 0,
  title: '',
  contents: '',
  nickname: '',
  regDate: '',
  lmiDate: '',
  boardName: '',
  fileItems: []
};


const PostView = () => {
  const nickname = useSelector(state => state.loginSlicer.nickname);

    const {id} = useParams();
    const [post, setPost] = useState({...initialState})
    const navigate = useNavigate(); 
    const [commentRefreshToggle, setCommentRefreshToggle] = useState(false)

    const refreshComments = () =>{
      setCommentRefreshToggle(prev => !prev);
    }
 


    useEffect(() => {
      console.log("게시글정보");
        //게시글 정보
        getPost(id)
            .then(data => { 
              console.log("Received post data:", data);
                setPost(data);
                
            })
            .catch(error =>{
                console.error("Error: ", error);
            })
   
      console.log("댓글목록");
      
        

    },[id]);

    const handleModifyClick = () =>{
      navigate(`/modify/${id}`);
    }
 
    return (
      <>
        <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
            {/* 제목 */}
            <h1 className="text-2xl font-bold text-gray-700 mb-4">{post.title}</h1>
            
            {/* 작성 정보 */}
            <div className="text-gray-500 text-sm mb-4">
                <span>📅 {new Date(post.createdAt).toLocaleString()}</span>
                {post.boardName === 'TASK' && post.lmiDate && (
                    <span className="ml-4">⏳ 마감일: {new Date(post.lmiDate).toLocaleString()}</span>
                )}
            </div>
            
            {/* 카테고리 */}
            <div className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {post.boardName === 'NOTICE' ? '📢 공지사항' : '📌 과제'}
            </div>
            
            {/* 내용 */}
            <div className="border-t pt-4 text-gray-800 leading-relaxed whitespace-pre-line min-h-[300px]">
                {post.contents || <span className="text-gray-400">내용이 없습니다.</span>}
            </div>
            
            {/* 첨부 파일 */}
            {post.files && post.files.length > 0 && (
                <div className="mt-6 p-4 bg-gray-100 rounded-md">
                    <h3 className="text-gray-600 font-semibold mb-2">📎 첨부 파일</h3>
                    <ul className="text-blue-500 text-sm">
                        {post.files.map((file, index) => (
                            <li key={index}>
                                <a href={file.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{file.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {/* 버튼 */}
            {post.nickname === nickname? <div className="flex justify-end mt-6 space-x-2">
                <button onClick={handleModifyClick} className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500 transition">
                    수정
                </button>
                <PostDelete id={id} boardName={post.boardName} />
                {/* <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                    삭제
                </button> */}
            </div> : <></>}
            
        </div>
    
        <div className="comment-section">
          <h3 className="comments-header">댓글 목록</h3>
          <CommentList id={id} refreshTrigger={commentRefreshToggle} onCommentAdded={refreshComments} />
          <div className="comment-form-container">
            <CommentForm id={id} onCommentAdded={refreshComments} />
          </div>
        </div>
      </>
    );
}
export default PostView;