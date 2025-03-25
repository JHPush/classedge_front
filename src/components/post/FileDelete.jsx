import { deleteFile } from "../../api/postApi/postApi";


const CommentDelete =({id, onFileDeleted})=>{

    const handleDelete = ()=>{

        if (window.confirm( "댓글을 삭제하시겠습니까?")) {
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

    return(
        <>
        <button onClick={handleDelete}>파일삭제</button>
        </>
    )

}
export default FileDelete;