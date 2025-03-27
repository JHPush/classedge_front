import { useEffect, useState } from "react";
import { getAllMembers, putMember } from "../../api/memberApi/admin";

const AdminComponent = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getAllMembers()
      .then((datas) => {
        setTeachers([]); // 초기화
        setStudents([]); // 초기화

        if (datas) {
          console.log("member data : ", datas);
          const updatedTeachers = [];
          const updatedStudents = [];

          datas.forEach((data) => {
            if (data.role === "PROFESSOR" && !data.isWithdraw) {
              updatedTeachers.push(data);
            } else if (data.role === "STUDENT" && !data.isWithdraw) {
              updatedStudents.push(data);
            }
          });

          setTeachers(updatedTeachers); // 한 번에 업데이트
          setStudents(updatedStudents); // 한 번에 업데이트
          console.log("teachers : ", updatedTeachers);
          console.log("students : ", updatedStudents);
        } else {
          console.log("Member Not Found!!");
        }
      })
      .catch((e) => {
        console.log("error : ", e);
      });
  }, []);

  const handleOnDelete = (email) => {
    putMember(email)
      .then((data) => {
        console.log("Success Fix Member Withdraw : ", data);

        // 삭제된 회원을 화면에서 제거
        setTeachers((prevTeachers) =>
          prevTeachers.filter((teacher) => teacher.email !== email)
        );

        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.email !== email)
        );
      })
      .catch((e) => {
        console.error("error : ", e);
      });
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">관리자 페이지</h1>

      {/* 강사 리스트 */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold border-b pb-2 mb-3">등록된 강사</h2>
        <ul className="space-y-4">
          {teachers.map((teacher) => (
            <li
              key={teacher.email}
              className="p-4 border rounded-md shadow-sm flex flex-col space-y-2 bg-gray-50"
            >
              <span className="font-medium">닉네임: {teacher.nickname}</span>
              <span>이메일: {teacher.email}</span>
              <span>역할: {teacher.role}</span>
              <span>상태: {teacher.isWithdraw ? "탈퇴" : "활성"}</span>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                onClick={() => handleOnDelete(teacher.email)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 학생 리스트 */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold border-b pb-2 mb-3">학생</h2>
        <ul className="space-y-4">
          {students.map((student) => (
            <li
              key={student.email}
              className="p-4 border rounded-md shadow-sm flex flex-col space-y-2 bg-gray-50"
            >
              <span className="font-medium">닉네임: {student.nickname}</span>
              <span>이메일: {student.email}</span>
              <span>역할: {student.role}</span>
              <span>상태: {student.isWithdraw ? "탈퇴" : "활성"}</span>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                onClick={() => handleOnDelete(student.email)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminComponent;