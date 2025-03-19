import React, { useState } from "react";
import "../css/LoginPage.css"; // 스타일을 별도로 관리합니다.
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginPostAsync } from "../../slicer/loginSlicer";
const initForm = {
    id: '',
    password: ''
}
const LoginPage = ()=> {
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
                (data.error) ? setResult('Fail') : navi('/', {replace:true})
            })
            .catch(e => {
                setResult('Fail')
                console.log('request error : ', e)
            })
    }

    return (
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
                <button type="button" className="login-button" onClick={handleOnLogin}>
                    로그인
                </button>
            </form>
            <button className="kakao-login-button">
                카카오 계정으로 로그인
            </button>
            <a href="/signup" className="signup-link">
                회원가입
            </a>
        </div>
    );
}

export default LoginPage;
