import React,{ useState } from "react";
import { postComment } from "../../api/postApi/postApi";
import FileUpload from "./FileUpload";


const CommentForm = ({id, onCommentAdded}) => {
     
    const [content, setContent] = useState('');
    const [commentId, setCommentId] = useState(null);
    const [UploadVisible, setUploadVisible] = useState(false); //파일 업로드 창 true=파일업로드창 false=댓글입력창
    const [uploadComplete, setUploadComplete] = useState(false); //파일업로드 완료여부 true=파일 업로드완료 상태
    const [tempContent, setTempContent] = useState(""); //파일업로드시 보여줄 댓글 임시 저장 내용

    
    //댓글작성
    const handleChange = (e) =>{
        setContent(e.target.value)
      }

    //댓글작성
     const handleClick = (e)  => {
         
          if(!content){
            alert('댓글내용을 입력하세요.');
          }else {
            if(window.confirm("댓글을 등록하시겠습니까?")){
              const newComment = { content, postId: id}
              console.log("newComment: ", newComment);
              
              postComment(newComment)
                .then((data) =>{
                  setUploadComplete(false);
                  setCommentId(data.id);
                  setTempContent(content);
                  setContent('');
                  setUploadVisible(true);
               
                  console.log("commentId:" ,data.id);
                  console.log("댓글등록완료")
                  
                })
                .catch((error) =>{
                  console.error("댓글 등록 실패: ", error);
                  
                })
            } 
          }
        }
    


    //파일업로드 완료후 댓글창 업데이트
     const handleUploadComplete = () =>{

      console.log("--------------------------call handleUploadComplete");
      
      setUploadComplete(true);  
      setUploadVisible(false); 
      setCommentId(null);
      setTempContent("");

      onCommentAdded();
      
      
     }

     //파일업로드 안할 경우 댓글창 업데이트
     const handleSkipUpload = () =>{
      setUploadVisible(false);
      setCommentId(null);
      setTempContent("");
      onCommentAdded();
     }

 
    return (
        <>
        {/* 파일 업로드 창이 보이면 댓글 입력창 숨김 */}
      {!UploadVisible && (
          <div className="form-container">
            <div className="form-group-horizontal">
                <input type="text" name="content" placeholder="댓글을 입력하세요." value={content} onChange={(handleChange)} />
            </div>
            <div>
                <button type="button" onClick={(handleClick)} >입력</button>
            </div>  
            </div>
            )}
             {/* 댓글 등록 후 파일 업로드 창을 띄우는 부분 */}
             {console.log("==================================", uploadComplete)}
             {commentId && !uploadComplete && (
                <div>
                    <p><strong>댓글 내용:</strong> {tempContent}</p>
                    <p>파일을 업로드하시겠습니까?</p>
                    <button onClick={handleSkipUpload}>안함</button>
                    <FileUpload commentId={commentId} postId={id} onUploaded={handleUploadComplete} />
                </div>
            )}
        
       
        </>
    )
};
export default CommentForm;