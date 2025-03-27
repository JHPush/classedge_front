import { useState } from 'react';
import './memberCss/SignupPage.css'; // CSS 파일 import
import { checkOverlap, postSignUp } from '../../api/memberApi/security';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const navi = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState('')
    const [allCheck, setAllCheck] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        id: '',
        memberName: '',
        password: '',
        nickname: '',
        loginType: 'NORMAL'
    });
    const [overlap, setOverlap] = useState({
        email: null,
        id: null,
        nickname: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleConfirmPassword = (e)=>{
        setConfirmPassword(e.target.value);
    }

    const handleCheckOverlap = (e)=>{
        const { name, value } = e.target;
        checkOverlap(e.target.name, e.target.value)
        .then(data=>{
            setOverlap({...overlap, [name]:data})
        }).catch(e=>{
            console.log(e);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.password != confirmPassword)
            return;
        if(overlap.email==false && overlap.id==false && overlap.nickname==false)
            setAllCheck(true);
        else{
            setAllCheck(false);
            return;
        };
        console.log('Form data submitted:', formData);
        postSignUp(formData).then(data=>{
            (data.error) ? console.log('회원가입 실패') : navi('/login', { replace: true })
        }).catch(e=>{
            console.log('회원가입 실패 이유 : ', e);
        });
    };

    return (
        <div className='parent-container'>
            <div className="container">
                <h2 className="title">회원가입</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>이름:</label>
                        <input type="text" name="memberName" value={formData.memberName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>닉네임:</label>
                        <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} required />
                        {overlap.nickname ?<div className='password-overlap'>중복된 닉네임 입니다</div> : formData.nickname != '' && overlap.nickname==false ? <div className='password-confirm'>사용가능한 닉네임</div> : <></> }
                        <button name='nickname' type="button" className="check-button" value={formData.nickname} onClick={handleCheckOverlap}>중복 확인</button>
                    </div>
                    <div className="form-group">
                        <label>아이디:</label>
                        <input type="text" name="id" value={formData.id} onChange={handleChange} required />
                        {overlap.id ?<div className='password-overlap'>중복된 ID 입니다</div> :  formData.id != '' && overlap.id==false ? <div className='password-confirm'>사용가능한 ID</div> : <></>}

                        <button name='id' type="button" className="check-button" value={formData.id} onClick={handleCheckOverlap}>중복 확인</button>
                    </div>
                    <div className="form-group">
                        <label>비밀번호:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>비밀번호 확인:</label>
                        <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} required />
                    </div>
                    {(formData.password != confirmPassword )&& confirmPassword ? <div className='password-overlap'>비밀번호를 다시 확인하세요</div> : <></>}
                    <div className="form-group">
                        <label>이메일:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        { overlap.email ?<div className='password-overlap'>중복된 이메일 입니다</div> : formData.email != '' && overlap.email==false ? <div className='password-confirm'>사용가능한 이메일</div> : <></>}
                        <button name='email' type="button" className="check-button" value={formData.email} onClick={handleCheckOverlap}>중복 확인</button>
                    </div>
                    { allCheck==false && allCheck != null ?<div className='password-overlap-middle'>중복확인이 필요합니다.</div> : <></>}

                    <button type="submit" className="submit-button">가입하기</button>
                </form>
                <p className="link-text">
                    이미 계정이 있으신가요? <a href="/login">로그인</a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;