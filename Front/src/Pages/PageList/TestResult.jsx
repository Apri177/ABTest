import Sidebar from "../../Components/Main/SideBar"
import TestResultInfoBar from "../../Components/Test/TestResultInfoBar"
import TestResultContainer from "../../Container/TestResultContainer"
import "react-toastify/dist/ReactToastify.css"

import '../../styles/main.scss'
import '../../styles/testresult.scss'
import { useEffect } from "react"

const TestResult = () => {

    useEffect(() => {
        
    }, [])

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