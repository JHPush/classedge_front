import React,{ useEffect, useState } from "react";
import { getComment} from "../../api/postApi/postApi";

const CommentList = ({id, refreshTrigger}) =>{

    const [comments, SetComments] = useState([]);

    useEffect(() => {
        //댓글 정보
        getComment(id)
        .then((data) => {
            SetComments(data);
        })
        .catch((error) => {
        console.error("Error: ", error);
        });

    },[id, refreshTrigger]);


    return(

    <>
    
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
          </div>

    </>
)
}
    export default CommentList;


