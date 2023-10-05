import {Route, BrowserRouter, Routes } from "react-router-dom";
import Main from "./Pages/PageList/Main";
import Test from "./Pages/PageList/Test";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
