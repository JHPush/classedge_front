import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slicer/loginSlicer";

const LogoutBtn = () => {
    const navi = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")){
            alert("로그아웃 되었습니다");
            dispatch(logout());
            navi('/login', { replace: true })
        }   
    };
    return (
        <button
            className="bg-transparent hover:text-red-600 py-2 px-4 rounded shadow-lg transform hover:scale-105 transition-transform duration-100"
            onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutBtn;