import React, { useRef, useState } from "react";
import { postComment } from "../../api/postApi/postApi";
import FileUpload from "./FileUpload";


const CommentForm = ({ id, onCommentAdded }) => {

  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);


  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
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
        console.log("newComment: ", newComment);

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

          })
      }
    }
  }



  return (
    <>

      {/* 댓글 입력 및 파일 업로드 부분 */}
      <div className="form-container">
        <div className="form-group">
          <input
            type="text"
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
          />
        </div>
        <div className="submit-button-group">
          <button
            type="button"
            onClick={handleClick}
            className="submit-button"
          >
            댓글 입력
          </button>
        </div>
      </div>


    </>
  );
}

export default CommentForm;