
import { useState } from "react";
import { putComment } from "../../api/postApi/postApi";
import FileDelete from "./FileDelete";
import FileDownload from "./FileDownload";
import "./postCss/Comment.css"


const CommentModify = ({id, currentContent , onModified, fileItems, isEditing, onFileDeleted}) => {

    const [content, setContent] =useState(currentContent);
    const [files, setFiles] = useState(fileItems);
    

    const handleClickModify = async () => {

        if (!content) {
            alert('수정할 내용을 입력하세요');
        } 
        
        const updatedComment = {id, content};
        putComment(updatedComment).then(data=>{
            const result = data;
            onModified(result)
        }).catch(e=>{
          console.error("수정실패 "+e)
        })
       
    }

    const handleChangeContent = (e) => {
        setContent(e.target.value); // 댓글 내용 변경
      };


    //파일 삭제시 상태 전달
    const handleFileDeleted = (fileId) =>{
        console.log("deleted file id:", fileId);
        setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
        onFileDeleted(id, fileId);
    }

    return(
      <>
      <div className="form-container">
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="content" className="font-semibold text-gray-600 mb-2 block">수정 내용</label> {/* 폰트와 간격 추가 */}
          <textarea 
            name="content" 
            value={content} 
            onChange={handleChangeContent} 
            className="comment-input mt-2 mb-4 p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      
        
        {isEditing && fileItems && fileItems.length > 0 && (
          <div className="file-edit-container">
            {fileItems.map((file) => (
              <div key={file.id} className="file-item">
                <FileDownload file={file} />
                <FileDelete id={file.id} onFileDeleted={handleFileDeleted} isPost={false}/>
              </div>
            ))}
          </div>
        )}

      <div className="form-actions submit-button-group">
          <button 
            type="button" 
            onClick={handleClickModify} 
            className="submit-button"
          >
            수정 완료
          </button>
        </div>
      </div>
    </>
    
    )
}
export default CommentModify;