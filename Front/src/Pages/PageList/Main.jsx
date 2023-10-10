import { useEffect, useState } from "react"
import Sidebar from "../../Components/Main/SideBar"
import InfoBarContainer from "../../Container/InfoBarContainer"
import ProjectContainer from "../../Container/ProjectContainer"
import ProjectPopup from "../../Components/popup/ProjectPopup"
import { apiTest, createProject, getProjects } from "../../util/api"
import { useDispatch, useSelector } from "react-redux"
import { getProjectState, setProjectState } from "../../store/projectStore"


const Main = () => {

    const dispatch = useDispatch();
    const projects = useSelector(state => state.project)

    useEffect(() => {
        (
            async () => {
                await getProjects()
                .then((res) => {
                    console.log(res.data[0]);
                    dispatch(setProjectState(res.data[0]))
                })
            }
        ) ()

        console.log(dispatch(getProjectState()));
    }, [])

    return (
        <div className="main-container">   
            {/* <ProjectPopup></ProjectPopup> */}
            
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