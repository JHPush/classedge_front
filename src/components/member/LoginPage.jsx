import { useState } from "react";
import "./memberCss/LoginPage.css"; // 스타일을 별도로 관리합니다.
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginPostAsync } from "../../slicer/loginSlicer";

const initForm = {
    id: '',
    password: ''
}

const LoginPage = () => {

    const [loginform, setLoginForm] = useState({ ...initForm });

    const navi = useNavigate()
    const [result, setResult] = useState(null);
    const dispatch = useDispatch();
    const handleOnChange = (e) => {
        setLoginForm({ ...loginform, [e.target.name]: e.target.value })
    }

    const handleOnLogin = (e) => {
        dispatch(loginPostAsync(loginform))
            .unwrap() // 비동기 작업 결과를 Promise 형태로 변환
            .then(data => {
                console.log('data : ', data);
                (data.error) ? setResult('Fail') : navi('/', { replace: true })
            })
            .catch(e => {
                setResult('Fail')
                console.log('request error : ', e)
            })
    }

    const handleKakaoLogin = () => {
        
        window.location.href = "https://kauth.kakao.com/oauth/authorize?client_id=0dfc6bf7b966b2bdfe198d82fc657170&redirect_uri=http://localhost:3000/oauth/kakao&response_type=code"
    };

    return (
        <div className="parent-container">
            <div className="login-container">
                <h1 className="login-title">로그인</h1>
                <form className="login-form">
                    <input
                        type="text"
                        placeholder="아이디"
                        className="input-field"
                        name="id"
                        onChange={handleOnChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        className="input-field"
                        name="password"
                        onChange={handleOnChange}
                        required
                    />
                    {result ==='Fail'? <div className="login-submit">없는 사용자이거나 비밀번호를 확인하세요</div> : <></> }
                    <button type="button" className="login-button" onClick={handleOnLogin}>
                        로그인
                    </button>
                </form>
                <button className="kakao-login-button" onClick={handleKakaoLogin}>
                    카카오 계정으로 로그인
                </button>
                <a href="/signup" className="signup-link">
                    회원가입
                </a>
            </div>
        </div>
    );
}

export default LoginPage;
