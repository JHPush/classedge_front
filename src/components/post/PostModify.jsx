
import { useEffect, useState } from "react";
import { getPost, putPost } from "../../api/postApi/postApi";
import FileDelete from "./FileDelete";
import { useNavigate, useParams } from "react-router-dom";

const initialState ={
    id: '',
    title: '',
    nickname: '',
    contents: '',
    boardName: 'NOTICE',
    lmiDate: '',
    fileItems: []
}

const PostModify = () => {

    const {id} = useParams();
    const [post, setPost] =useState({...initialState});
    const navigate = useNavigate();
  
    useEffect(() => {
        
            getPost(id).then(data => {
                setPost({
                    id: data.id,
                    title: data.title,
                    contents: data.contents,
                    nickname: data.nickname,
                    boardName: data.boardName,
                    lmiDate: data.lmiDate || '',
                    fileItems: data.fileItems || [] 
                  });  
            }).catch(error => {
                console.error("Error:", error);
            });
        
    }, [id]);

    const handleSubmit = async () => {

        if(! post.title){
                alert('제목을 입력하세요');

            }else if(! post.contents){
                alert('내용을 입력하세요');
                
            }else{ if(window.confirm("게시글을 수정하시겠습니까?")){

                    putPost(post)
                        .then(data =>{
                            console.log("data:" ,data);
                            setPost(data);

                            navigate(`/view/${post.id}`)
                        
                              alert('게시글이 수정되었습니다.');
                        })
                        .catch(error =>{
                            console.error("Error: ", error);
                            alert('게시글 수정에 실패했습니다.');
                        });
                        
                }
                }
        }

    const handleChange =(e) =>{ 

        const {name, value} = e.target;
        setPost((prevPost) => ({ ...prevPost, [name]: value }));
        };


    const handleFileDeleted = (deletedFileId) =>{
        console.log("deleted file id:", deletedFileId);
        setPost((prevPost) => ({
            ...prevPost,
            fileItems: prevPost.fileItems.filter((file) => file.id !== deletedFileId)
        }));
    }

    return(
    <>
            <div className="form-container">

        <h1 className="form-title">게시글 수정</h1>

        <div className="form-group-horizontal">
            <label htmlFor="boardName">카테고리</label>
            <select name="boardName" value={post.boardName} onChange={handleChange}>
                <option value={"NOTICE"}>공지사항</option>
                <option value={"TASK"}>과제</option>
            </select>
        {/* 과제 카테고리 lmiDate */}
        {post.boardName === 'TASK' && (
        <div className="form-group-horizontal">
            <label htmlFor="lmiDate">과제 마감일</label>
            <input
            type="datetime-local" name="lmiDate" value={post.lmiDate} onChange={handleChange}/>
        </div>
        )}
        </div>


        <div className="form-group-horizontal">
            <label htmlFor="title">제목</label>
            <input type="text" name="title" placeholder="제목을 입력하세요." value={post.title} onChange={handleChange} />
        </div>
        <div className="form-group-horizontal">
            <label htmlFor="contents">내용</label>
            <textarea name="contents" placeholder="내용을 입력하세요." value={post.contents} onChange={handleChange} ></textarea>
        </div>
        <div className="form-actions">
        <button type="button" onClick={(handleSubmit)} >수정완료</button>
        </div>   
        {post.fileItems && post.fileItems.length > 0 && (
        <div>
          {post.fileItems.map((file) => (
            <div key={file.id}> <span>{file.fileName}</span>
              <FileDelete id={file.id} onFileDeleted={handleFileDeleted} />
            </div>
          ))}
        </div>
      )}
        </div>
    </>
    )
}
export default PostModify;