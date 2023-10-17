import Sidebar from "../../Components/Main/SideBar"
import TestResultInfoBar from "../../Components/Test/TestResultInfoBar"
import TestResultContainer from "../../Container/TestResultContainer"

import '../../styles/main.scss'
import '../../styles/testresult.scss'

const TestResult = () => {
    return (
        <div className="main-container">

            <Sidebar/>

            <div style={{
                width: "85vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <TestResultInfoBar/>
                <TestResultContainer/>
            </div>

        </div>
    )
}


export default TestResult