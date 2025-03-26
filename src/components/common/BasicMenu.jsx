import { Link } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";

const BasicMenu = () => {

  const member = getCookie('member')

  return (
    member != null?
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">

      {/* 왼쪽 메뉴 */}
      <div className="flex space-x-6">
        <Link to="/" className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition">🏠 Home</Link>
        <Link to={{ pathname: "/task" }} state='NOTICE'
          className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition">📢 공지사항</Link>
        <Link to={{ pathname: "/task" }} state='TASK' className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition">📌 과제</Link>
      </div>

      <div className="flex items-center">

        {/* 사용자 정보 (왼쪽) */}
        <div className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer mr-4">
          사용자 : {member.nickname}
        </div>

        {/* 로그아웃 버튼 (오른쪽) */}
        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
          Logout
        </div>

      </div>

    </nav>
    :<></>
  );
}

export default BasicMenu;