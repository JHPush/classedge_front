import React, { useEffect, useState } from "react";
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
  const user = useSelector(state => state.loginSlicer.initState);

  const { id } = useParams();
  const [post, setPost] = useState({ ...initialState })
  const navigate = useNavigate();
  const [commentRefreshToggle, setCommentRefreshToggle] = useState(false)

  const refreshComments = () => {
    setCommentRefreshToggle(prev => !prev);
  }

  useEffect(() => {
    console.log("user : ", user)
    //게시글 정보
    getPost(id)
      .then(data => {
        console.log("Received post data:", data);
        setPost(data);
      })
      .catch(error => {
        console.error("Error: ", error);
      })
  }, [id]);

  const handleModifyClick = () => {
    navigate(`/modify/${id}`);
  }

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
        {/* 제목 */}
        <h1 className="text-2xl font-bold text-gray-700 mb-4">{post.title}</h1>

        {/* 작성 정보 */}
        <div className="text-gray-500 text-sm mb-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-700">작성자:</span>
            <span className="text-gray-600">{post.nickname}</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-700">📅</span>
            <span className="text-gray-600">{new Date(post.regDate).toLocaleString()}</span>
          </div>

          {post.boardName === 'TASK' && post.lmiDate && (
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">⏳ 마감일:</span>
              <span className="text-gray-600">{new Date(post.lmiDate).toLocaleString()}</span>
            </div>
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
        {post.fileItems && post.fileItems.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="text-gray-600 font-semibold mb-2">📁 첨부 파일</h3>
            <ul className="file-items-list mt-4 mb-4"> {/* 위아래 간격 추가 */}
              {post.fileItems.map((file) => (
                <li key={file.id} className="file-item mb-2">
                  <FileDownload file={file} isPost={true} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 버튼 */}
        <div className="flex justify-end mt-6 space-x-2 items-center">
          {post.nickname === user.nickname ? <div>
            <button onClick={handleModifyClick} className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500 transition">
              수정
            </button>
          </div>
            :
            <></>
          }
          {
            user.role == "ADMIN" || user.nickname === post.nickname ?
              <PostDelete id={id} boardName={post.boardName} /> : <></>
          }
        </div>

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