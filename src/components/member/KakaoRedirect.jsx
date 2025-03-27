import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { kakaoLoginPostAsync } from "../../slicer/loginSlicer";


const KakaoRedirect = () => {

  const [searchParams] = useSearchParams();
  const code  = searchParams.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    if (code) {
      // 카카오 로그인 요청을 dispatch를 통해 실행
      dispatch(kakaoLoginPostAsync( code ))
        .unwrap() // unwrap을 사용하여 비동기 액션의 결과를 받아옴
        .then((data) => {
          if (data.error) {
            alert("카카오 로그인 중 오류가 발생했습니다.");
            navigate("/login");
          } else if(data.isNewUser) {
            // 신규 사용자라면 회원가입 페이지로 이동
            navigate(`/signup?kakaoNickname=${data.kakaoNickname}`);
          } else {
            console.log("로그인 성공: ", data);
            // 메인 페이지로 리디렉션
            navigate("/", { replace: true });
          }
        })
        .catch((error) => {
          console.error("로그인 요청 실패:", error);
        });
    }
  }, [code]);
      

  return <div>카카오 로그인 중입니다...</div>;
};

export default KakaoRedirect;
