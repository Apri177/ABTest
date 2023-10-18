import {Route, BrowserRouter, Routes } from "react-router-dom";
import Main from "./Pages/PageList/Main";
import Project from "./Pages/PageList/Project";
import Test from "./Pages/PageList/Test";
import TestResult from "./Pages/PageList/TestResult";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/project/:project_id" element={<Project/>}/>
        <Route path="/project/:project_id/test/:test_name/play" element={<Test/>}/>
        <Route path="/project/:project_id/test/:test_name/result" element={<TestResult/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
