import Sidebar from "../../Components/Main/SideBar"
import InfoBarContainer from "../../Container/InfoBarContainer"
import ProjectContainer from "../../Container/ProjectContainer"
import ProjectPopup from "../../Components/popup/ProjectPopup"
import { useEffect } from "react"
import { getProjectState } from "../../store/projectStore"
import { ToastContainer } from "react-toastify"

const Main = () => {

    useEffect(() => {
        getProjectState()
    }, [])

    return (
        <div className="main-container">
            <ToastContainer
            position="top-right" // 알람 위치 지정
            autoClose={3000} // 자동 off 시간
            hideProgressBar={false} // 진행시간바 숨김
            closeOnClick // 클릭으로 알람 닫기
            rtl={false} // 알림 좌우 반전
            pauseOnFocusLoss // 화면을 벗어나면 알람 정지
            draggable // 드래그 가능
            pauseOnHover // 마우스를 올리면 알람 정지
            theme="light"
            limit={1} // 알람 개수 제한
            />
            <ProjectPopup></ProjectPopup>
            <Sidebar/>
            <div style={{
                width: "85vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <InfoBarContainer/>
                <ProjectContainer/>
            </div>
        </div>
    )
}

export default Main