import Sidebar from "../../Components/Main/SideBar"
import InfoBarContainer from "../../Container/InfoBarContainer"
import ProjectContainer from "../../Container/ProjectContainer"
import ProjectPopup from "../../Components/popup/ProjectPopup"


const Main = () => {

    return (
        <div className="main-container">
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