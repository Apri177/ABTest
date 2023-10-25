import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPreTest } from "../store/testStore"

const TestResultContainer = () => {

    const dispatch = useDispatch()
    const preTest = useSelector(state => state.test.preTest)
    const [test, setTest] = useState({

    })

    useEffect(() => {
        setTest(preTest)
        console.log(test);
    }, [dispatch, preTest, test])

    return (
        <div className="test-result-container">
            <div className="container">
                <div className="sec1">
                    <p id="test_sel"> 
                        {test.testSel}
                    </p>
                </div>
                <div className="sec2">

                </div>
                <div className="sec3">

                </div>
            </div>
        </div>
    )
}


export default TestResultContainer