import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateForm = () => {
    const { seq } = useParams();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/SpringReactProject/board/view?seq=${seq}`)
            .then(response => {
                const { title, content } = response.data;
                setTitle(title);
                setContent(content);
            })
            .catch(error => console.error("오류 발생 : ", error));
    }, [seq]);

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

    const onUpdate = (e) => {
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

        axios.post(`http://localhost:8080/SpringReactProject/board/update?seq=${seq}&title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`)
            .then(response => {
                alert(response.data);
                navigate("/board/list");
            })
            .catch(error => console.error("오류 발생(업데이트): ", error));
    };

    return (
        <div className="updateForm">
            <form onSubmit={onUpdate}>
                <h3>글 수정</h3>
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
                                <textarea name="content" id="content" value={content} onChange={onInput}></textarea>
                                {contentError && <div id="contentDiv" style={{ color: 'red' }}>{contentError}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign: 'center' }}>
                                <button type="submit">수정</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </form>
        </div>
    );
};

export default UpdateForm;
