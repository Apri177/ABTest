import Sidebar from "../../Components/Main/SideBar"
import TestResultInfoBar from "../../Components/Test/TestResultInfoBar"
import TestResultContainer from "../../Container/TestResultContainer"
import "react-toastify/dist/ReactToastify.css"

import '../../styles/main.scss'
import '../../styles/testresult.scss'
import { useEffect } from "react"
import { getTestById } from "../../util/api/test"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setPreTest } from "../../store/testStore"

const TestResult = () => {

    const param = useParams()

    const dispatch = useDispatch()
    const testState = useSelector(state => state.test)

    useEffect(() => {
        const res = getTestById(param.project_id, param.test_name)
        res.then((rst) => {
            dispatch(setPreTest(
                {
                    name : rst.data.name,
                    numOfSets : rst.data.numOfSets,
                    score: rst.data.score,
                    testResult: rst.data.testResult,
                    tester: rst.data.tester,
                    file1: rst.data.image1.uploadFilename,
                    file2: rst.data.image2.uploadFilename,
                    testSel: "vs"
                }
            ))
        })
    }, [dispatch, param.project_id, param.test_name])

    return (
        <div className="main-container">

            <Sidebar/>

            <div style={{
                width: "85vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>

                <TestResultInfoBar testName={"~/ " + testState.preTest.name} param={param}/>
                <TestResultContainer/>
            </div>
        </div>
    )
}


export default TestResult
