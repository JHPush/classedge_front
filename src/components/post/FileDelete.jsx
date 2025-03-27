import { deleteFile } from "../../api/postApi/postApi";


const FileDelete =({id, onFileDeleted, isPost})=>{

    const handleDelete = ()=>{

        if (window.confirm( "파일을 삭제하시겠습니까?")) {
            deleteFile(id)
            .then(() =>{
                onFileDeleted(id);
                console.log("deleted File id: ", id);
                
            })
            .catch((error) =>{ 
                console.error("error:" ,error);
            
            })
        }
    }

    return (
        <button 
        onClick={handleDelete} 
        className={`file-delete-btn ${isPost ? 'post-file-btn' : 'comment-file-btn'}`}
    >
        {isPost ? "파일삭제" : "파일삭제"}
    </button>
      );
      

}
export default FileDelete;