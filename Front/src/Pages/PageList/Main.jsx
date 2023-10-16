import Sidebar from "../../Components/Main/SideBar"
import InfoBarContainer from "../../Container/InfoBarContainer"
import ProjectContainer from "../../Container/ProjectContainer"
import ProjectPopup from "../../Components/popup/ProjectPopup"
import { useEffect } from "react"
import { getProjectState } from "../../store/projectStore"
import { useDispatch, useSelector } from "react-redux"


const Main = () => {

    const dispatch = useDispatch()
    const projects = useSelector(state => state.projects)

    useEffect(() => {
        getProjectState()
    }, [])

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