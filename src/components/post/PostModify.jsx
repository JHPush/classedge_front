
import { useEffect, useState } from "react";
import { getPost, putPost } from "../../api/postApi/postApi";
import FileDelete from "./FileDelete";
import { useNavigate, useParams } from "react-router-dom";
import FileDownload from "./FileDownload";

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
            <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
        {/* 제목 */}
        <h1 className="text-2xl font-bold text-gray-700 mb-6">📝 게시글 수정</h1>

        {/* 카테고리 선택 */}
        <div className="flex items-center space-x-4 mb-4">
            <label className="font-semibold text-gray-600" htmlFor="boardName">카테고리</label>
            <select name="boardName" value={post.boardName} onChange={handleChange} className="p-2 border rounded-md">
                <option value="NOTICE">공지사항</option>
                <option value="TASK">과제</option>
            </select>
        </div>

        {/* 과제 마감일 (과제 선택 시만 보임) */}
        {post.boardName === 'TASK' && (
            <div className="flex items-center space-x-4 mb-4">
                <label className="font-semibold text-gray-600" htmlFor="lmiDate">📅 과제 마감일</label>
                <input type="datetime-local" name="lmiDate" value={post.lmiDate} onChange={handleChange} className="p-2 border rounded-md" />
            </div>
        )}

        {/* 제목 입력 */}
        <div className="mb-4">
            <label className="font-semibold text-gray-600 block mb-1" htmlFor="title">제목</label>
            <input type="text" name="title" placeholder="제목을 입력하세요." value={post.title} onChange={handleChange} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300" />
        </div>

        {/* 내용 입력 */}
        <div className="mb-4">
            <label className="font-semibold text-gray-600 block mb-1" htmlFor="contents">내용</label>
            <textarea name="contents" placeholder="내용을 입력하세요." value={post.contents} onChange={handleChange} className="w-full p-2 border rounded-md h-96 resize-none overflow-auto focus:ring-2 focus:ring-blue-300"></textarea>
        </div>

        {/* 파일 목록 */}
        {post.fileItems && post.fileItems.length > 0 && (
            <div className="mb-4 bg-gray-100 p-4 rounded-md">
                <h2 className="text-gray-700 font-semibold mb-2">📂 첨부 파일</h2>
                {post.fileItems.map((file) => (
                    <div key={file.id} className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm mb-2">
                         <FileDownload file={file} />
                        {/* <span className="text-gray-600">{file.fileName}</span> */}
                        <FileDelete id={file.id} onFileDeleted={handleFileDeleted} isPost={true} />
                    </div>
                ))}
            </div>
        )}

      {/* 수정 완료 버튼 */}
        <div className="flex justify-end mt-6 space-x-2">
            <button type="button" onClick={handleSubmit} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
                수정완료
            </button>
        </div>

    </div>

    </>
    )
}
export default PostModify;