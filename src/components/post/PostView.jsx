import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../api/postApi/postApi";
import FileHandler from "./FileHandler";
import "./postCss/PostView.css"
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";


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
    const [commentRefreshToggle, setCommentRefreshToggle] = useState("false")
   
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
 

    return (
      <>
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
        
        </div>
        <CommentList id ={id} refreshTrigger={commentRefreshToggle}/>
        <CommentForm id ={id} onCommentAdded={refreshComments}/>

        </>
        
      );
}
export default PostView;