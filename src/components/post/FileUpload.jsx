import { useState } from "react";
import { uploadFile } from "../../api/postApi/postApi";

const FileUpload = ({postId, commentId, onUploaded}) =>{

   
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) =>{
        const selectedFiles = e.target.files;
        setFiles(selectedFiles);
        console.log(selectedFiles);
        
    }

    const handleUpload = () =>{
        if(!files){
            alert("파일을 선택하세요")
        } if(!postId){
            alert("게시글을 먼저 등록해주세요")
        }else {
            uploadFile(files, postId, commentId)
                .then((data) => {
                    console.log("파일업로드 성공", data);
                    onUploaded();
                    

                })
                .catch(error =>{
                    console.error("error:", error);
                    
                })
        }
    }
    return(
        <>
        <div>
            <input type="file" onChange={handleFileChange} multiple/>
            <button onClick={handleUpload}>업로드</button>
        </div>
        
        </>
    )
}
export default FileUpload;