import React from 'react';

const Main = () => {
    const userId = sessionStorage.getItem('userId');

    return (
        <div className="main">
            {userId ? (
                <h3>환영합니다, {userId}님!</h3>
            ) : (
                <h3></h3>
            )}
            <h1>리치 홈페이지</h1>
            <h2>방문해주셔서 감사합니다.</h2>
            <img className="logo" src="https://kr.object.ncloudstorage.com/bitcamp-9th-bucket-97/uploads/534bb5f3-300d-428a-9ed5-11225f573c4f_KakaoTalk_20241019_164303092_02.jpg" alt="메인로고" />
        </div>
    );
};

export default Main;