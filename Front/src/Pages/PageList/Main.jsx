import { useState } from "react"
import Sidebar from "../../Components/Main/SideBar"
import InfoBarContainer from "../../Container/InfoBarContainer"
import ProjectContainer from "../../Container/ProjectContainer"
import Popup from "../../Components/popup/Popup"


const Main = () => {


    return (
        <div className="main-container">   
            <Popup></Popup>
            
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