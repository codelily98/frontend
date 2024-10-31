import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const writeForm = () => {
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            alert("로그인이 필요합니다.");
            navigate("/");
        }
    }, []);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const navigate = useNavigate();

    const onInput = (e) => {
        const { name, value } = e.target;
        if (name === "title") {
            setTitle(value);
            setTitleError("");
        } else if (name === "content") {
            setContent(value);
            setContentError("");
        }
    };

    const onWrite = (e) => {
        e.preventDefault();

        setTitleError("");
        setContentError("");

        let valid = true;
        if (title === "") {
            setTitleError("제목을 입력해주세요.");
            valid = false;
        }
        if (content === "") {
            setContentError("내용을 입력해주세요.");
            valid = false;
        }
        if (!valid) return;

        axios.post(`http://localhost:8080/SpringReactProject/board/write?title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`)
            .then(response => {
                alert(response.data);
                navigate("/board/list");
            })
            .catch(error => console.error(error));
    };

    const onReset = () => {
        setTitle("");
        setContent("");
    }

    return (
        <div className="writeForm">
            <form onSubmit={onWrite}>
                <h3>글 쓰기</h3>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr className="inputFiled">
                            <td><label htmlFor="title">Title</label></td>
                            <td>
                                <input type="text" name="title" id="title" value={title} onChange={onInput} />
                                {titleError && <div id="titleDiv" style={{ color: 'red' }}>{titleError}</div>}
                            </td>
                        </tr>
                        <tr className="inputFiled">
                            <td><label htmlFor="content">Content</label></td>
                            <td>
                                <textarea type="text" name="content" id="content" value={content} onChange={onInput}></textarea>
                                {contentError && <div id="contentDiv" style={{ color: 'red' }}>{contentError}</div>}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
                <div className='btnwrap'>
                    <button type="submit">작성</button>
                    <button type="button" onClick={onReset}>초기화</button>
                </div>
            </form>
        </div>
    );
};

export default writeForm;