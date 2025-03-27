import { useEffect, useState }  from "react"
import { downloadFile } from "../../api/postApi/postApi";
import './postCss/File.css'

       
const FileDownload = ({file, isPost}) => {

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
        <div className={`file-download-container ${isPost ? 'post-file' : 'comment-file'}`}>
            {/* 썸네일 이미지 */}
            {thumbnailUrl ? (
                <div className={`thumbnail-container ${isPost ? 'post-thumbnail' : 'comment-thumbnail'}`}>
                    <img
                        src={thumbnailUrl}
                        alt={file.fileName}
                        className={`thumbnail-img ${isPost ? 'post-thumbnail-img' : ''}`}  // 게시글일 경우 별도 클래스 추가
                    />
                </div>
            ) : null} {/* 썸네일이 없을 때 빈 공간을 만들지 않음 */}
        
            {/* 다운로드 버튼 - 이미지 파일이 아닌 경우에도 파일 이름만 표시 */}
            <button
                onClick={() => downloadFileHandler(file.id, file.fileName)}
                className="file-download-btn text-blue-500 font-medium hover:underline"
            >
                {file.fileName}
            </button>
        </div>
    </>
    
    )
}

export default FileDownload;