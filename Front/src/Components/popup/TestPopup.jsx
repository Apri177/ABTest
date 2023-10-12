import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { close } from "../../store/popupStore"
import '../../styles/popup.scss'


const TestPopup = () => {

    // reducer 작성하긴했는데 수정해야 함

    const dispatch = useDispatch()

    const state = useSelector(state => state.popup)
    
    
    const [page, setPage] = useState(0)
    
    
    const closeHandler = () => {
        dispatch(close())
        setPage(0)
    }
    
    const next = () => {
        setPage(page + 1)
    }

    const back = () => {
        setPage(page - 1)
    }

    useEffect(() => {
        console.log(page);
    }, [page])

    const [test, setTest] = useState({

    })


    const setName = (e) => {
        setTest({...test, name: e.target.value})
    }

    const setMaxPart = (e) => {
        setTest({...test, maxPart : e.target.value})
    }

    const setPassword = (e) => {
        setTest({...test, password : e.target.value})
    }

    const setAdminCode = (e) => {
        setTest({...test, adminCode : e.target.value})
    }






    return(
        <div
        style={{
            visibility: state.popup.show ? "visible" : "hidden", 
            opacity:  state.popup.show ? 1 : 0
            // visibility: "visible",
            // opacity: 1
        }} className="overlay">
            <div className="popup" style={{
                height: page === 2 ? "80vh" : "50vh"
            }}>
                <div className="popup-title">
                    New Test
                </div>
                {
                page === 0 ? 
                    <div className="sec1">
                        <div className="insert-info" id="test-name">
                            test name
                        </div>
                        <input type="text" name="test-name" id="popup-test-name" className="popup-input" onChange={setName}/>

                        <div className="insert-info" id="test-max-part">
                            max participants
                        </div>
                        <input type="text" name="max-participants" id="popup-max-part" className="popup-input" onChange={setMaxPart}/>

                        <div className="insert-info" id="test-password">
                            password
                        </div>
                        <input type="text" name="password" id="popup-test-password" className="popup-input" onChange={setPassword}/>

                        <div className="insert-info" id="test-admin-code">
                            admin code
                        </div>
                        <input type="text" name="admin-code" id="popup-test-admin-code" className="popup-input" onChange={setAdminCode}/>
                    </div>
                    : page === 1 ?
                    <div className="sec1">
                        <div className="desc-insert" id="test-files">
                            Files
                        </div>

                        <div className="insert-info" id="test-dir1">
                            directory 1
                        </div>
                        <input type="text" name="dir1" id="popup-test-dir1" className="popup-input" disabled/>
                        <img src="/images/icon-upload-file.svg" alt="file upload" style={{
                            maxWidth:"2vw",
                        }} id="upload1"/>

                        <div className="insert-info" id="test-dir2">
                            directory 2
                        </div>
                        <input type="text" name="dir2" id="popup-test-dir2" className="popup-input" disabled/>
                        <img src="/images/icon-upload-file.svg" alt="file upload" style={{
                            maxWidth:"2vw",
                        }} id="upload2"/>

                        <div className="insert-info" id="test-csv">
                            prompt csv
                        </div>
                        <input type="text" name="prom-csv" id="popup-test-csv" className="popup-input" disabled/>
                        <img src="/images/icon-upload-file.svg" alt="file upload" style={{
                            maxWidth:"2vw",
                        }} id="upload3"/>
                    </div>
                    : page === 2 ?
                    <div className="sec1">
                        <div className="insert-info" id="number-of-sets">
                            number of sets
                        </div>
    
                        <input type="text" className="popup-input" id="popup-num-of-sets"/>
    
                        <div className="desc-insert" id="comparison-method">
                            Comparison method
                        </div>
    
                        <img src="/images/comparison.svg" alt="comparison" id="comparison"/>
    
                        <div className="desc-insert" id="test-configuration">
                            Test configuration
                        </div>
    
                        <img src="/images/mixed.svg" alt="mixed" id="mixed"/>
    
                        <img src="/images/identical.svg" alt="identical" id="identical"/>
                    </div>
                    :
                    <div className="sec1">
                        <div className="insert-info" id="criteria-sel">
                            selection criteria
                        </div>
    
                        <input type="text" className="popup-input" id="popup-criteria"/>
    
                        <div className="desc-insert" id="method-sel">
                            Selection method
                        </div>
    
                        <img src="/images/vs.svg" alt="vs" id="vs"/>
                        
                        <img src="/images/likert.svg" alt="likert" id="likert"/>
                    </div>

                }
                




                <div className="sec2">
                    {
                        page < 1 ? 
                        <button className="common-button popup-cancel" onClick={closeHandler}>
                            cancel
                        </button>
                        :
                        <button className="common-button popup-cancel" onClick={back}>
                            back
                        </button>

                    }
                    {
                        page < 3 ? 
                    <button className="common-button popup-next" onClick={next}>
                        NEXT
                    </button> :
                    <button className="common-button popup-done" type="submit">
                        DONE
                    </button>
                    }
                    

                </div>
            </div>
        </div>
    )
}


export default TestPopup