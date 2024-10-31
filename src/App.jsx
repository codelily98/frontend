import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Main from './components/main/Main';
import LoginForm from './components/member/LoginForm';
import WriteForm from './components/board/WriteForm';
import List from './components/board/List';
import Logout from './components/member/Logout';
import View from './components/board/View';
import UpdateForm from './components/board/UpdateForm';
import "./css/style05.css";

const App = () => {
  return (
    <BrowserRouter>
      <nav className='menunav'>
        <ul>
          <li><Link to={"/"}>메인화면</Link></li>
          <li><Link to={"/LoginForm"}>로그인</Link></li>
          <li><Link to={"/logout"}>로그아웃</Link></li>
          <li><Link to={"/board/writeForm"}>글쓰기</Link></li>
          <li><Link to={"/board/list"}>글목록</Link></li>
        </ul>
      </nav>
      <div className='wrap'>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/LoginForm" element={<LoginForm />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/board/writeForm" element={<WriteForm />}></Route>
          <Route path="/board/list" element={<List />}></Route>
          <Route path="/board/view/:seq" element={<View />}></Route>
          <Route path="/board/updateForm/:seq" element={<UpdateForm />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;