import { useNavigate } from "react-router-dom";
import { deletePost } from "../../api/postApi/postApi";




const PostDelete =({id, boardName})=>{

    const navigate = useNavigate();

    const handleDelete = ()=>{
        if(window.confirm("정말로 게시글을 삭제하시겠습니까?")){
        try{
            deletePost(id);
    
            navigate('/task',
                {
                    state: boardName  // 상태 전달
                })
        
        }catch (error){ 
            console.error("error:" ,error);
            alert("게시글 삭제에 실패했습니다.");
        }
    }}

    return(
        <>
        <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">삭제</button>
        </>
    )
}
export default PostDelete;