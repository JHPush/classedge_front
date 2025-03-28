import React, { useRef, useState } from "react";
import { postComment } from "../../api/postApi/postApi";
import "./postCss/Comment.css"


const CommentForm = ({ id, onCommentAdded }) => {

  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 개당 3MB
  const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 전체 총합 10MB


  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    let totalSize = 0;
    let invalidFiles = [];

      // 파일 크기 체크
      Array.from(selectedFiles).forEach(file => {
          if (file.size > MAX_FILE_SIZE) {
              invalidFiles.push(file);
          } else {
              totalSize += file.size;
          }
      });

      // 개별 파일 크기 초과 확인
      if (invalidFiles.length > 0) {
          alert(`파일용량이 너무 큽니다. 3MB 이하의 파일을 첨부해주세요`);
          setFiles([]); 
          if (fileInputRef.current) {
            fileInputRef.current.value = ''; 
          }
      }
      // 전체 파일 크기 초과 확인
      else if (totalSize > MAX_TOTAL_SIZE) {
          alert(`파일 크기 총합이 10MB를 초과할 수 없습니다.`);
          setFiles([]); 
          if (fileInputRef.current) {
            fileInputRef.current.value = ''; 
          }
      } else {
          setFiles(selectedFiles);
      }

      console.log(selectedFiles);

    }



  //댓글작성
  const handleChange = (e) => {
    setContent(e.target.value)
  }


  //댓글작성
  const handleClick = (e) => {

    if (!content) {
      alert('댓글내용을 입력하세요.');

    } else {
      if (window.confirm("댓글을 등록하시겠습니까?")) {

        const newComment = { content, postId: id }
        console.log("postid: ", newComment.postId);
        console.log("newComment: ", newComment.id);

        postComment(newComment, files).then((data) => {
          console.log("sss : " + data.id);

          console.log("commentId:", data.id);
          console.log("댓글등록완료")

          onCommentAdded();
          setContent('');
          setFiles([]);
          if (fileInputRef.current) {
            fileInputRef.current.value = ''; // 파일 입력창 리셋
          }
        })
          .catch(error => {
            console.error("댓글 등록 실패: ", error);
            alert('댓글 등록에 실패하였습니다')

          })
      }
    }
  }



  return (
    <>
        {/* 댓글 입력 및 파일 업로드 부분 */}
      <div className="form-container">
        <div className="form-group">
          <textarea
            name="content"
            placeholder="댓글을 입력하세요."
            value={content}
            onChange={handleChange}
            className="comment-input"
          />
        </div>

        <div className="file-upload-group">
          <input
            type="file"
            id="file-upload"
            className="file-input"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
          />
        </div>

        <div className="submit-button-group">
          <button
            type="button"
            onClick={handleClick}
            className="submit-button"
          >
          댓글 등록
          </button>
        </div>
      </div>


    </>
  );
}

export default CommentForm;