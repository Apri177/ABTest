import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { close } from "../../store/popupStore"
import '../../styles/popup.scss'
import { useParams } from "react-router-dom"
import { createTest } from "../../util/api/test"
import { setTestState } from "../../store/testStore"

const TestPopup = () => {


    
    // reducer 작성하긴했는데 수정해야 함
    
    const dispatch = useDispatch()
    
    const state = useSelector(state => state.popup)
    
    const testState = useSelector(state => state.test.tests)
    
    useEffect(() => {
        
    }, [])

    const [page, setPage] = useState(0)
    
    const [test, setTest] = useState({
        name : "",
        maxPart : "",
        password : "",
    })
    
    const [code, setCode] = useState("")
    
    
    const [images1, setImages1] = useState(null);
    const [images2, setImages2] = useState(null);
    const [images3, setImages3] = useState(null);
    
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
        setCode(e.target.value)
    }

    const setFile1 = (e) => {
        setImages1(e.target.files[0])
    }
    
    const setFile2 = (e) => {
        setImages2(e.target.files[0])
    }
    
    const setFile3 = (e) => {
        setImages3(e.target.files[0])
    }
    
    const closeHandler = () => {
        dispatch(close())
        setPage(0)
        setTest({})
    }
    
    const next = () => {
        setPage(page + 1)
    }

    const back = () => {
        setPage(page - 1)
    }

    const create = async() => {

        const formdata = new FormData()

        formdata.append("body", JSON.stringify({
            name: test.name,
            password: test.password,
            maxPart: test.maxPart,
        }))
        
        formdata.append("image1", images1)
        formdata.append("image2", images2)
        formdata.append("prompt", images3)

        await createTest(param.project_id, formdata)
        closeHandler()
        window.location.reload()
    }

    const param = useParams()
    
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
                            <input type="text" 
                            name="name" 
                            id="popup-test-name" 
                            className="popup-input" 
                            onChange={setName} 
                            value={test.name || ""}/>

                            <div className="insert-info" id="test-max-part">
                                max participants
                            </div>
                            <input type="text" 
                            name="maxPart" 
                            id="popup-max-part" 
                            className="popup-input" 
                            onChange={setMaxPart}
                            value={test.maxPart || ""}/>

                            <div className="insert-info" id="test-password">
                                password
                            </div>
                            <input type="text" 
                            name="password" 
                            id="popup-test-password" 
                            className="popup-input" 
                            onChange={setPassword} 
                            value={test.password || ""}/>

                            <div className="insert-info" id="test-admin-code">
                                admin code
                            </div>
                            <input type="text" 
                            id="popup-test-admin-code" 
                            className="popup-input" 
                            onChange={setAdminCode} />

                        </div>
                        : page === 1 ?
                        <div className="sec1">
                            <div className="desc-insert" id="test-files">
                                Files
                            </div>

                            <div className="insert-info" id="test-dir1">
                                directory 1
                            </div>
                            <input type="text" id="popup-test-dir1" className="popup-input" disabled/>
                            
                            <label htmlFor="file-upload1">
                                <img src="/images/icon-upload-file.svg" alt="file upload" style={{
                                    maxWidth:"2vw",
                                }} id="upload1"/>
                            </label>
                            <input type="file" id="file-upload1" style={{
                                display: "none"
                            }}
                            onChange={setFile1}
                            accept="application/zip"/>

                            <div className="insert-info" id="test-dir2">
                                directory 2
                            </div>
                            <input type="text" id="popup-test-dir2" className="popup-input" disabled value={test.images2}/>

                            <label htmlFor="file-upload2">
                                <img src="/images/icon-upload-file.svg" alt="file upload" style={{
                                    maxWidth:"2vw",
                                }} id="upload2"/>
                            </label>
                            <input type="file" id="file-upload2" style={{
                                display: "none"
                            }} 
                            onChange={setFile2}
                            accept="application/zip"/>

                            <div className="insert-info" id="test-csv">
                                prompt csv
                            </div>
                            <input type="text" id="popup-test-csv" className="popup-input" disabled/>
                            <label htmlFor="file-upload3">
                                <img src="/images/icon-upload-file.svg" alt="file upload" style={{
                                    maxWidth:"2vw",
                                }} id="upload3"/>
                            </label>
                            <input type="file" id="file-upload3" style={{
                                display: "none"
                            }} 
                            onChange={setFile3}/>
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
                        <button 
                        className="common-button popup-done" 
                        onClick={create} 
                        // type="submit"
                        >
                            DONE
                        </button>
                        }
                    </div>
            </div>
        </div>
    )
}


export default TestPopup