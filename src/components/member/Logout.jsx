import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            alert("로그인 상태가 아닙니다.");
            navigate("/");
            return;
        }

        axios.get("http://localhost:8080/SpringReactProject/member/logout", { withCredentials: true })
            .then(response => {
                alert(response.data);
                sessionStorage.removeItem("userId");
                navigate("/");
            })
            .catch(error => console.log(error))
    }, []);
    return (
        <>

        </>
    );
};

export default Logout;