import React,{ useState } from "react";
import { postComment } from "../../api/postApi/postApi";


const SubCommentForm = ({id, parentId, onCommentAdded}) => {

    const [content, setContent] = useState('');
     const [files, setFiles] = useState([]);
 
    
     //댓글작성
     const handleChange = (e) =>{
        setContent(e.target.value)
      }

        //답글작성
        const handleReplyClick = ()  => {

            if(!content){
              alert('답글내용을 입력하세요.');
            }else {
              if(window.confirm("답글을 등록하시겠습니까?")){
                const newComment = { content, postId: id, parent: parentId}
                console.log("newComment: ", newComment);
                console.log("postid: ", id);
                console.log("parentid:",parentId )
                postComment(newComment,files)
                  .then(() =>{
                    
                    setContent('');
                    onCommentAdded();
                    console.log("댓글등록완료")
                   
                  })
                  .catch((error) =>{
                    console.error("댓글 등록 실패: ", error);
                    
                  })
              }       
      
            }
          }

    return (
        <>
      <div className="reply-form-container">
  <div className="form-group-horizontal">
    <input
      type="text"
      name="replyContent"
      placeholder="답글을 입력하세요."
      value={content}
      onChange={handleChange}
      className="reply-input"
    />
  </div>

  <div className="submit-button-group">
    <button
      type="button"
      onClick={handleReplyClick}
      className="submit-button"
    >
      등록
    </button>
  </div>
</div>

        </>
    )
}
export default SubCommentForm;