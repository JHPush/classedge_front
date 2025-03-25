import { useState } from "react";
import { uploadFile } from "../../api/postApi/postApi";

const FileUpload = ({postId}) =>{

   
    const [file, setFile] = useState(null);

    const handleFileChange = (e) =>{
        const selectedFiles = Array.from(e.target.file); 
        setFile(selectedFiles);
    }

    const handleUpload = () =>{
        if(!file){
            alert("파일을 선택하세요")
        }else {
            uploadFile(file, postId)
                .then((data) => {
                    console.log("파일업로드 성공", data);
                    
                })
                .catch(error =>{
                    console.error("error:", error);
                    
                })
        }
    }
    return(
        <>
        <div>
            <h2>파일 업로드</h2>
            <input type="file" onChange={handleFileChange} multiple />
            <button onClick={handleUpload}>업로드</button>
        </div>
        
        </>
    )
}
export default FileUpload;