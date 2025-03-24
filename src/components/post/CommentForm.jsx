import React,{ useState } from "react";
import { postComment } from "../../api/postApi/postApi";

const CommentForm = ({id, onCommentAdded}) => {
     
    const [content, SetContent] = useState('');
    const [parentId, SetparenId] = useState(null);
   
     const handleClick = (e)  => {
         
          if(!content){
            alert('댓글내용을 입력하세요.');
          }else {
            if(window.confirm("댓글을 등록하시겠습니까?")){
              const newComment = { content, postId: id, parent: parentId}
              console.log("newComment: ", newComment);
              
              postComment(newComment)
                .then(() =>{
                  
                  SetContent('');
                  SetparenId(null);
                  onCommentAdded();
                  console.log("댓글등록완료")
    
                })
                .catch((error) =>{
                  console.error("댓글 등록 실패: ", error);
                  
                })
            } 
          }
        }

       
    
        const handleChange = (e) =>{
            SetContent(e.target.value)
          }
       

    return (
        <>
          <div className="form-container">
            <div className="form-group-horizontal">
                <label htmlFor="content">댓글</label>
                <input type="text" name="content" placeholder="댓글을 입력하세요." value={content} onChange={(handleChange)} />
            </div>
            <div>
                <button type="button" onClick={(handleClick)} >댓글등록</button>
            </div>  
        </div>
        </>
    )
};
export default CommentForm;