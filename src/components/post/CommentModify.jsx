
import { useState } from "react";
import { putComment } from "../../api/postApi/postApi";
import FileDelete from "./FileDelete";
import FileDownload from "./FileDownload";


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
      <div className="form-group">
        <label htmlFor="content">내용</label>
        <textarea name="content" value={content} onChange={handleChangeContent}/>
      </div>
      <div className="form-actions">
        <button type="button" onClick={handleClickModify}>수정 완료</button>
      </div>
        {/* isEditing이 true일 때만 파일 목록 표시 */}
        {isEditing && fileItems && fileItems.length > 0 && (
          <div className="file-edit-container">
            {fileItems.map((file) => (
              <div key={file.id} className="file-item">
                <FileDownload file={file} /> {/* 썸네일 + 파일 이름 표시 */}
                <FileDelete id={file.id} onFileDeleted={handleFileDeleted} /> {/* 삭제 버튼 */}
              </div>
            ))}
          </div>
        )}
    </div>
    </>
    )
}
export default CommentModify;