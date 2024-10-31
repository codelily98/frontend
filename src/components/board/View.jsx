import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const View = () => {
    const [view, setView] = useState({});
    const navigate = useNavigate();
    const { seq } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/SpringReactProject/board/view?seq=${seq}`)
            .then(response => {
                setView(response.data);
            })
            .catch(error => {
                console.log(error);
                setView({});
            })
    }, []);

    const onUpdate = () => {
        navigate(`/board/updateForm/${seq}`);
    }

    const onDelete = () => {
        if (!confirm("정말 삭제하시겠습니까?")) {
            return;
        }

        axios.get(`http://localhost:8080/SpringReactProject/board/delete?seq=${seq}`)
            .then(response => {
                alert(response.data);
                navigate("/board/list");
            })
            .catch(error => {
                alert("삭제에 실패했습니다.");
                console.log(error);
            })
    }

    return (
        <div className='viewList'>
            <table>
                <thead><tr><th colSpan="2">글번호 : {seq}</th></tr></thead>
                <tbody>
                    <tr>
                        <th>제목</th>
                        <td>{view.title}</td>
                    </tr>
                    <tr>
                        <th className='content'>내용</th>
                        <td className='content'>{view.content}</td>
                    </tr>
                </tbody>
                <tfoot></tfoot>
            </table>
            <div className='btnwrap'>
                <button onClick={onUpdate}>수정</button>
                <button onClick={onDelete}>삭제</button>
            </div>
        </div>
    );
};

export default View;