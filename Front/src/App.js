import {Route, BrowserRouter, Routes } from "react-router-dom";
import Main from "./Pages/PageList/Main";
import Project from "./Pages/PageList/Project";
import Test from "./Pages/PageList/Test";
import TestResult from "./Pages/PageList/TestResult";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <BrowserRouter>
        <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={3000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="light"
        limit={1} // 알람 개수 제한
      />
      <Routes>
        <Route path="/" element={<Test/>} />
        <Route path="/project/:project_id" element={<Project/>}/>
        <Route path="/project/:project_id/test/:test_name/play" element={<Test/>}/>
        <Route path="/project/:project_id/test/:test_name/result" element={<TestResult/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
