import { useNavigate } from "react-router-dom";
import BasicLayout from "./BasicLayout";
import { useEffect, useState } from "react";
import { getCookie } from "../../utils/cookieUtils";
import { useSelector } from "react-redux";

const MainPage = () => {
  const navi = useNavigate();

  const id = useSelector(state => state.loginSlicer.id);

  useEffect(()=>{
    console.log(id);
    if (!id)
      navi('/login', { replace: true });
  },[])


  return (
    <BasicLayout>

      <div className=" text-3xl">Main Page</div>
    </BasicLayout>
  );
}

export default MainPage;
