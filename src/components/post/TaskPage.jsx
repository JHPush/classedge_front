import { useLocation } from "react-router-dom";
import BasicLayout from "../common/BasicLayout";
import PostPageComponent from "./PostPageComponent";

const TaskPage = () => {
    const location = useLocation();
    
    
  return (
    <BasicLayout>
    {location.state=='NOTICE'?<div className=" text-4xl mb-6">📢 공지사항</div>:<div className=" text-4xl mb-6">📌 과제</div> }
      
      <PostPageComponent className="mt-10"/>
    </BasicLayout>

  );
}

export default TaskPage;
