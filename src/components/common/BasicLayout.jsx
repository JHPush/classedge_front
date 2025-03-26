import { useNavigate } from "react-router-dom";
import BasicMenu from "./BasicMenu";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const BasicLayout = ({ children }) => {
  const navi = useNavigate();

  const id = useSelector(state => state.loginSlicer.id);

  useEffect(()=>{
    if (!id)
      navi('/login', { replace: true });
  },[])


  return (
    <>
      <BasicMenu />
      
      <div className="bg-gray-100 min-h-screen flex justify-center p-6">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl">
          {children}
        </div>
      </div>
    </>
  );
}

export default BasicLayout;