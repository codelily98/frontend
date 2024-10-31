import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const List = () => {
    const [list, setList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/SpringReactProject/board/list")
            .then(response => setList(response.data))
            .catch(error => {
                console.log(error);
                setList([]);
            });
    }, []);

    return (
        <div className='boardList'>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(item => (<tr key={item.seq} id={item.seq} onClick={() => navigate(`/board/view/${item.seq}`)}>
                            <td>{item.seq}</td>
                            <td>{item.title}</td>
                        </tr>))
                    }
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    );
};

export default List;