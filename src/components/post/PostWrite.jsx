import  { useState } from 'react';
import { registerPost } from '../../api/postApi/postApi';
import FileUpload from './FileUpload';
//import { useNavigate } from 'react-router-dom';  // 페이지 리디렉션을 위한 useNavigate


const initialState ={
    title: '',
    nickname: '',
    contents: '',
    boardName: 'NOTICE',
    lmiDate: ''
}

const Postwrite = () => {
  const [post, setPost] = useState({...initialState});
  const [postId, setPostId] = useState(null);
  //const [uploadVisible, setUploadVisible] = useState(false); //파일 업로드 창
 // const navigate = useNavigate();  // 페이지 이동을 위한 hook


  const handleChange =(e) =>{ 

    const {name, value} = e.target;
    setPost({...post, [name]: value})
    };

  const handleClickSave =() =>{

    if(! post.title){
          alert('제목을 입력하세요');

    }else if(! post.contents){
          alert('내용을 입력하세요');
          
    }else{ if(window.confirm("게시글을 등록하시겠습니까?")){
            registerPost(post)
                  .then(data =>{
                    setPostId(data.id)
                    setPost({...initialState});
                    console.log("postid:" ,data.id);
                      
                  })
                  .catch(error =>{
                      console.error("Error: ", error);
                      
                  });
                  
          }
        }
  }

//   const toggleUpload = () =>{
//     setUploadVisible(!uploadVisible);
//   }

  return (
    <>
        <div className="form-container">

            <h1 className="form-title">게시글 작성</h1>

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
            <button type="button" onClick={(handleClickSave)} >등록</button>
            </div>   
            {postId && <FileUpload postId={postId} commentId={null}/>}
            {/* 업로드 버튼
            {postId && (
            <>
                {!uploadVisible ? ( 
                    <button type="button" onClick={toggleUpload}>파일 업로드</button>
                ) : (
                <>
                <FileUpload postId={postId} commentId={null}/>
                    <button type="button" onClick={toggleUpload}>업로드 안함</button>
                </>
                )}
            </>
                )} */}
        </div>

       

    </>
)
};

export default Postwrite;
