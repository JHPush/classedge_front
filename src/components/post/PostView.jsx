import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComment, getPost, postComment } from "../../api/postApi/postApi";
import FileHandler from "./FileHandler";
import "./postCss/PostView.css"


const initialState = {
    id : 0,
    title: '',
    contents: '',
    email: '',
    regDate: '',
    lmiDate: '',
    boardName: '',
    fileItems:[]
};


const PostView = () =>{

    const {id} = useParams();
    const [post, setPost] = useState({...initialState})
    const [comments, SetComments] = useState([]);
    const [content, SetContent] = useState('');
    const [parentId, SetparenId] = useState(null);
    const [replyVisible, SetReplyVisible] = useState(null);


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
      
          //댓글 정보
          getComment(id)
          .then((data) => {
            SetComments(data);
      })
          .catch((error) => {
          console.error("Error: ", error);
      });

    },[id]);

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
              console.log("댓글등록완료")

              setTimeout(() => {
                window.location.reload();  
            }, 500);

            })
            .catch((error) =>{
              console.error("댓글 등록 실패: ", error);
              
            })
        }       

      }
    }

    const handleReplyClick = (parentId)  => {

     
        if(!content){
          alert('답글내용을 입력하세요.');
        }else {
          if(window.confirm("답글을 등록하시겠습니까?")){
            const newComment = { content, postId: id, parent: parentId}
            console.log("newComment: ", newComment);
            
            postComment(newComment)
              .then(() =>{
                
                SetContent('');
                SetReplyVisible(null);
                SetparenId(null);
                console.log("댓글등록완료")
  
                setTimeout(() => {
                  window.location.reload();  
              }, 500);
  
              })
              .catch((error) =>{
                console.error("댓글 등록 실패: ", error);
                
              })
          }       
  
        }
      }



    const handleSubClick = (id) => {
        SetReplyVisible(replyVisible === id ? null : id)
        SetparenId(id);
        console.log(`${id} 번 댓글의 답글 작성`);
        
    }

    const handleChange = (e) =>{
      SetContent(e.target.value)
    }
           

        

    return (
        <div className="container">
          <div className="title">{post.id}번 게시글 정보</div>
          <div className="content"><strong>제목:</strong> {post.title}</div>
            <div className="content"><strong>내용:</strong> {post.contents}</div>
            <div className="content"><strong>작성자:</strong> {post.email}</div>
            <div className="content"><strong>작성일:</strong> {post.regDate}</div>
            <div className="content"><strong>과제기한:</strong> {post.lmiDate}</div>
            <div className="content"><strong>카테고리:</strong> {post.boardName}</div>
    

          {post.fileItems && post.fileItems.length > 0 && (
              <div>
                <h3>첨부파일</h3>
                {post.fileItems.map((file) => (
                <FileHandler key={file.id} file={file} />
              ))}
              </div>
            )}


          <div className="comments-section">
          <h3>댓글 목록</h3>
          <ul>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} style={{ marginLeft: `${comment.level * 20}px` }}>
              <div>
              <div className="title">No.{comment.id}</div>
              </div>
              <div><strong>작성자:</strong> {comment.email}</div>
              <div><strong>작성일:</strong> {comment.regDate}</div>
              <div><strong>내용:</strong> {comment.content}</div>

              {/* 답글 버튼 추가 */}
              <button onClick={() => handleSubClick(comment.id)}>답글</button>
               
              {/* 하위 댓글이 있는 경우 */}
              {comment.subComments && comment.subComments.length > 0 && (
                <ul>
                  {comment.subComments.map((subComment) => (
                    <li key={subComment.id} style={{ marginLeft: `${subComment.level * 20}px` }}>
                      <div className="title">sub No.{subComment.id}</div>
                      <div><span style={{ fontWeight: 'bold' }}>작성자 : </span>{subComment.email}</div>
                      <div><span style={{ fontWeight: 'bold' }}>작성일 : </span>{subComment.regDate}</div>
                      <div><span style={{ fontWeight: 'bold' }}>내용 : </span>{subComment.content}</div>
                    </li>
                  ))}
                </ul>
                  )}
                </li>
              ))
            ) : (
              <p>댓글이 없습니다.</p> 
            )}
          </ul>

          {replyVisible === comments.id && ( 
          <div className="form-container">
            <div className="form-group-horizontal">
                <label htmlFor="content">답글</label>
                <input type="text" name="content" placeholder="답글을 입력하세요." value={content} onChange={(handleChange)} />
            </div>
            <div>
                <button type="button" onClick={() => handleReplyClick(comments.id)} >답글등록</button>
            </div>  
            </div>
        )}


        {!parentId && (
          <div className="form-container">
            <div className="form-group-horizontal">
                <label htmlFor="content">댓글</label>
                <input type="text" name="content" placeholder="댓글을 입력하세요." value={content} onChange={(handleChange)} />
            </div>
            <div>
                <button type="button" onClick={(handleClick)} >댓글등록</button>
            </div>  

        </div>
        )}
        
        </div>
        </div>
      );
}
export default PostView;