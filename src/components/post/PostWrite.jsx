import  { useState } from 'react';
import { registerPost } from '../../api/postApi/postApi';
//import { useNavigate } from 'react-router-dom';  // 페이지 리디렉션을 위한 useNavigate


const initialState ={
    title: '',
    nickname: '',
    contents: ''
}

const Postwrite = () => {
  const [post, setPost] = useState({...initialState});
 // const navigate = useNavigate();  // 페이지 이동을 위한 hook


  const handleChange =(e) =>{ 

    post[e.target.name] = e.target.value;
    setPost({...post})

    };


  const handleClickSave =() =>{

    if(! post.title){
          alert('제목을 입력하세요');
    }else if(! post.contents){
          alert('내용을 입력하세요');
    }else{ if(window.confirm("게시글을 등록하시겠습니까?")){
            registerPost(post)
                  .then(data =>{
                      setPost({...initialState});
                  })
                  .catch(error =>{
                      console.error("Error: ", error);
                      
                  });
                  
          }
        }
  }

  return (
    <>
        <div className="form-container">

            <h1 className="form-title">게시글 작성</h1>

            <div className="form-group-horizontal">
                <label htmlFor="title">제목</label>
                <input type="text" name="title" placeholder="제목을 입력하세요." value={post.title} onChange={handleChange} />
            </div>
            <div className="form-group-horizontal">
                <label htmlFor="contents">내용</label>
                <textarea name="contents" placeholder="내용을 입력하세요." value={post.contents} onChange={handleChange} ></textarea>
            </div>
            <div className="form-actions">
            <button type="button" onClick={(handleClickSave)} >저장</button>
            </div>    
        </div>

       

    </>
)
};

export default Postwrite;
