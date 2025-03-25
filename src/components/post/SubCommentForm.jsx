import React,{ useState } from "react";
import { postComment } from "../../api/postApi/postApi";


const SubCommentForm = ({id, parentId, onCommentAdded}) => {

    const [content, setContent] = useState('');
 
    
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
                console.log("parentid:",parentId )
                postComment(newComment)
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
        
        <div className="form-container">
            <div className="form-group-horizontal">
                <input type="text" name="content" placeholder="답글을 입력하세요." value={content} onChange={(handleChange)} />
            </div>
            <div>
                <button type="button" onClick={(handleReplyClick)} >등록</button>
            </div>  
        </div>
        </>
    )
}
export default SubCommentForm;