import { deleteComment } from "../../api/postApi/postApi";


const CommentDelete =({id, hasReplies, onDeleteSuccess})=>{

    const handleDelete = ()=>{

        const warningMessage = hasReplies 
        ? "이 댓글에는 답글이 있습니다. 댓글을 삭제하면 답글까지 모두 삭제됩니다.\n정말 삭제하시겠습니까?" 
        : "댓글을 삭제하시겠습니까?";

        const isConfirmed = window.confirm(warningMessage);
        if (!isConfirmed) return;

        try{
            
            deleteComment(id);
            onDeleteSuccess(id);

            console.log("deleteid: ", id);
            
        }catch (error){ 
            console.error("error:" ,error);
            
        }
    }

    return(
        <>
        <button
          onClick={handleDelete}
          className="delete-button"
        >삭제</button>
      </>
    )
}
export default CommentDelete;