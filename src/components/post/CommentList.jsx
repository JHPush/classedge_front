import React,{ useEffect, useState } from "react";
import { getComment} from "../../api/postApi/postApi";
import SubCommentForm from "./SubCommentForm";
import FileDownload from "./FileDownload";
import CommentDelete from "./CommentDelete";
import CommentModify from "./CommentModify";
import { useSelector } from "react-redux";
import "./postCss/Comment.css"

const initialState = {
  contents: '',
  nickname: '',
  fileItems:[]
};

const CommentList = ({id, refreshTrigger, onCommentAdded}) =>{
  const nickname = useSelector(state => state.loginSlicer.initState.nickname);

    const [comments, setComments] = useState([]);
    const [replyVisible, setReplyVisible] = useState(null);
    const [editMode, setEditMode ] = useState(null);
  

    useEffect(() => {
        //댓글 정보
        
        getComment(id)
        .then((data) => {
          console.log("최신 댓글 목록:", data);
          if(data.length <=0) return;
          data.sort((a,b)=>a.id-b.id)
          setComments(data);
        })
        .catch((error) => {
        console.error("댓글 불러오기 실패:: ", error);
        });

    },[id, refreshTrigger]);

    //답글작성 토글
    const handleReplyChange = (commentId) => {
        setReplyVisible(replyVisible === commentId ? null : commentId)
    }

    //답글작성 되면 입력창 닫기
    const handleReplyAdded = () => {
        setReplyVisible(null);
        onCommentAdded();
    }

    //댓글삭제
    const handleDeleteSuccess = (deletedCommentId) => {
      setComments(prev => prev
        .map(comment => ({
            ...comment,
            subComments: comment.subComments.filter(subComment => subComment.id !== deletedCommentId) // 답글 삭제
        })) 
        .filter(comment => comment.id !== deletedCommentId) // 원댓글 삭제
      )
    }

     // 댓글 수정 모드 변경 
    const handleEditToggle = (commentId) => {
    setEditMode(editMode === commentId ? null : commentId); // 수정 모드 토글
  };

  // 댓글 수정 완료 후 상태 갱신
    const handleModify = (modifiedComment) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === modifiedComment.id
          ? { ...comment, content: modifiedComment.content }
          : {
              ...comment,
              subComments: comment.subComments.map((subComment) =>
                subComment.id === modifiedComment.id
                  ? { ...subComment, content: modifiedComment.content }
                  : subComment
              ),
            }
    )
    );
      setEditMode(null); // 수정 모드 종료
      console.log(" 수정 성공! 최신 데이터 불러오기");// 수정요함!!!!!
      const updatedComments =  getComment(id);  // 최신 데이터 강제 호출
      console.log("최신 댓글 목록:", updatedComments);

      setComments(updatedComments); 
      onCommentAdded();
  };

   // 파일 즉시 삭제 처리
   const handleFileDeleted = (commentId, fileId) => {
    setComments((prevComments) =>
        prevComments.map((comment) =>
            comment.id === commentId
                ? {
                    ...comment,
                    fileItems: comment.fileItems.filter((file) => file.id !== fileId),
                }
                : comment
        )
    );
}


  return (
    <>
 <div className="comments-section">
  {/* <h3 className="comments-header">댓글 목록</h3> */}
  <ul>
    {comments.length > 0 ? (
      comments.map((comment) => (
        <li key={comment.id} className="comment-item" style={{ marginLeft: `${comment.level * 1}px` }}>
          <div className="comment-header">
            <span className="comment-author">{comment.nickname}</span>
            <span className="comment-date">{comment.regDate}</span>
          </div>

          {/* 댓글 수정/삭제 영역 */}
          {editMode === comment.id ? (
            <CommentModify 
              id={comment.id} 
              currentContent={comment.content} 
              fileItems={comment.fileItems} 
              isEditing={true} 
              onModified={handleModify} 
              onFileDeleted={handleFileDeleted} 
            />
          ) : (
            <>
              <div className="comment-content">{comment.content}</div>

              {comment.fileItems && comment.fileItems.length > 0 && (
                <div className="comment-files">
                  {comment.fileItems.map((file) => (
                    <FileDownload key={file.id} file={file} isPost={false} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* 댓글 수정/삭제 버튼 */}
          {nickname === comment.nickname && (
            <div className="comment-actions" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {editMode !== comment.id && (
                <button onClick={() => handleEditToggle(comment.id)} className="comment-action-btn">수정</button>
              )}
              <CommentDelete id={comment.id} hasReplies={comment.subComments.length > 0} onDeleteSuccess={handleDeleteSuccess} />
            </div>
          )}

          {/* 대댓글 목록 */}
          {comment.subComments && comment.subComments.length > 0 && (
            <div className="sub-comments">
              <ul>
                {comment.subComments.map((subComment) => (
                  <li key={subComment.id} style={{ marginLeft: `${subComment.level * 20}px` }}>
                    <div className="comment-header">
                      <span className="comment-author">{subComment.nickname}</span>
                      <span className="comment-date">{subComment.regDate}</span>
                    </div>

                    {/* 대댓글 수정/삭제 영역 */}
                    {editMode === subComment.id ? (
                      <CommentModify 
                        id={subComment.id} 
                        currentContent={subComment.content} 
                        fileItems={subComment.fileItems} 
                        isEditing={true} 
                        onModified={handleModify} 
                      />
                    ) : (
                      <>
                        <div className="comment-content">{subComment.content}</div>

                        {subComment.fileItems && subComment.fileItems.length > 0 && (
                          <div className="comment-files">
                            {subComment.fileItems.map((file) => (
                              <FileDownload key={file.id} file={file} />
                            ))}
                          </div>
                        )}
                      </>
                    )}

                    {/* 대댓글 수정/삭제 버튼 */}
                    {nickname === subComment.nickname && (
                      <div className="comment-actions" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {editMode !== subComment.id && (
                          <button onClick={() => handleEditToggle(subComment.id)} className="comment-action-btn">수정</button>
                        )}
                        <CommentDelete id={subComment.id} onDeleteSuccess={handleDeleteSuccess} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 답글 달기 버튼 */}
          <div className="reply-actions">
            <button onClick={() => handleReplyChange(comment.id)} className="comment-action-btn reply-btn">
              답글 달기
            </button>
            {replyVisible === comment.id && (
              <SubCommentForm id={id} parentId={comment.id} onCommentAdded={handleReplyAdded} />
            )}
          </div>
        </li>
      ))
    ) : (
      <p>댓글이 없습니다.</p>
    )}
  </ul>
</div>



</>

  );
  
}
    export default CommentList;


