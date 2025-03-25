import { useEffect, useState }  from "react"
import { downloadFile } from "../../api/postApi/postApi";
import './postCss/File.css'

       
const FileDownload = ({file}) => {

    const [thumbnailUrl, SetThumbnailUrl] = useState(null);

    useEffect(() =>{
        const getThumbnail = async() =>{
            if(file.thumbnailPath){
                try{
                    const response = await downloadFile(file.id);
                    const blobUrl = URL.createObjectURL(response);
                    SetThumbnailUrl(blobUrl);

                } catch(error){ 
                    console.error();
                
                }
            }
         }
        getThumbnail();
    },[file])





    const downloadFileHandler = async (id, fileName) => {

        try{
            
        const response = await downloadFile(id)

        //url 생성
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();

        } catch(error){ 
            console.error("다운로드 에러", error);        
        }
    }

  

    return (
        <>
        <div>
        <div className="thumbnail">
            {thumbnailUrl ? (<img src={thumbnailUrl} alt={file.fileName} className="file-thumbnail"/>) : (<span></span>)}
            
        </div>

        <button onClick={() =>downloadFileHandler(file.id, file.fileName)} className = "file-download-btn">{file.fileName}</button>
        </div>
        </>
    )
}

export default FileDownload;