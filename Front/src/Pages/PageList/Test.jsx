import Sidebar from "../../Components/Main/SideBar"
import TestContainer from "../../Container/TestContainer"
import TestPopup from "../../Components/popup/TestPopup"

const Test = () => {
    return (
        <div className="main-container">
            <Sidebar/>
            <TestContainer/>
            <TestPopup>

            </TestPopup>
        </div>
    )
}


export default Test