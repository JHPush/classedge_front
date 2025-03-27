import { deleteFile } from "../../api/postApi/postApi";


const FileDelete =({id, onFileDeleted})=>{

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
        <button onClick={handleDelete} className="file-delete-btn">
          파일 삭제
        </button>
      );
      

}
export default FileDelete;