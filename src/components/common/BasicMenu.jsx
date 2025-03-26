import { Link } from "react-router-dom";
import AlertPop from "../member/AlertPop";
import LogoutBtn from "../member/LogoutBtn";
import { getCookie } from "../../utils/cookieUtils";
import { useSelector } from "react-redux";

const BasicMenu = () => {

  const member = useSelector(state => state.loginSlicer)

  return (
    member != null ?
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        {/* 왼쪽 메뉴 */}
        <div className="flex space-x-6">
          <Link to="/" className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition">🏠 Home</Link>
          <Link to={{ pathname: "/task" }} state='NOTICE'
            className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition">📢 공지사항</Link>
          <Link to={{ pathname: "/task" }} state='TASK' className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition">📌 과제</Link>
        </div>
        <div className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer mr-4">
          사용자 : {member.nickname}
        </div>
        <div className="w-1/5 flex justify-end bg-transparent p-4 font-medium">
          <AlertPop />
          <LogoutBtn />

        </div>

      </nav>
      : <></>
  );
}

export default BasicMenu;