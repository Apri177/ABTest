import Sidebar from "../../Components/Main/SideBar"
import TestContainer from "../../Container/TestContainer"
import TestPopup from "../../Components/popup/TestPopup"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getProjectById } from "../../util/api"
import { useDispatch, useSelector } from "react-redux"
import { getPreProjectState, setPreProjectState, setTests } from "../../store/projectStore"

const Project = () => {

    const param = useParams()

    const dispatch = useDispatch()
    const projectState = useSelector(state => state.project)

    useEffect(() => {
        getPreProjectState()
    }, [])

    return (
        <div className="main-container">
            <Sidebar/>
            <TestContainer/>
            <TestPopup>

            </TestPopup>
        </div>
    )
}


export default Project