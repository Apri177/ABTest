import {Route, BrowserRouter, Routes } from "react-router-dom";
import Main from "./Pages/PageList/Main";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
