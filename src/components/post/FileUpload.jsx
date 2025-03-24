// import { useState } from "react";
// import { uploadFile } from "../../api/postApi/postApi";

// const FileUpload = ({postId, commentId}) =>{

//     const [file, setFile] = useState(null);

//     const handleFileChange = (e) =>{
//         setFile(e.target.files[0]);
//     }

//     const handleUpload = () =>{
//         if(!file){
//             alert("파일을 선택하세요")
//         }else {
//             uploadFile(file, postId, commentId)
//                 .then((response) => {
//                     console.log("파일업로드 성공", response);
                    
//                 })
//                 .catch(error =>{
//                     console.error("error:", error);
                    
//                 })
//         }
//     }
//     return(
//         <>
//         <div>
//             <h2>파일 업로드</h2>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleUpload}>업로드</button>
//         </div>
//         </>
//     )
// }
// export default FileUpload;