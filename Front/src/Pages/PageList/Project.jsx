import Sidebar from "../../Components/Main/SideBar"
import TestContainer from "../../Container/TestContainer"
import TestPopup from "../../Components/popup/TestPopup"
import { useEffect } from "react"
import { getPreProjectState} from "../../store/projectStore"
const Project = () => {

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