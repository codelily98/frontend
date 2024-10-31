import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const LoginForm = () => {
    const [str, setStr] = useState("");
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [idError, setIdError] = useState("");
    const [pwdError, setPwdError] = useState("");
    const navigate = useNavigate();

    const onInput = (e) => {
        const { name, value } = e.target;
        if (name === "id") {
            setId(value);
            setIdError("");
        } else if (name === "pwd") {
            setPwd(value);
            setPwdError("");
        }
    };

    const onLogin = (e) => {
        e.preventDefault();

        setIdError("");
        setPwdError("");

        let valid = true;
        if (id === "") {
            setIdError("아이디를 입력해주세요.");
            valid = false;
        }
        if (pwd === "") {
            setPwdError("비밀번호를 입력해주세요.");
            valid = false;
        }
        if (!valid) return;

        axios.post(`http://localhost:8080/SpringReactProject/member/login?id=${id}&pwd=${pwd}`, { withCredentials: true })
            .then(response => {
                sessionStorage.setItem('userId', id);
                setStr(response.data);
                navigate("/");
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="loginForm">
            <form onSubmit={onLogin}>
                <h3>로그인</h3>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr className="inputFiled">
                            <td><label htmlFor="id">ID</label></td>
                            <td>
                                <input type="text" name="id" id="id" value={id} onChange={onInput} />
                                {idError && <div id="idDiv" style={{ color: 'red' }}>{idError}</div>}
                            </td>
                        </tr>
                        <tr className="inputFiled">
                            <td><label htmlFor="pwd">Password</label></td>
                            <td>
                                <input type="password" name="pwd" id="pwd" value={pwd} onChange={onInput} autoComplete="current-password" />
                                {pwdError && <div id="pwdDiv" style={{ color: 'red' }}>{pwdError}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign: 'center' }}>
                                <button type="submit">로그인</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
                <h3>{str}</h3>
            </form>
        </div>
    );
};

export default LoginForm;
