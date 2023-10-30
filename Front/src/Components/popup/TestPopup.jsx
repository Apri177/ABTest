import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { close } from "../../store/popupStore"
import '../../styles/popup.scss'
import { useParams } from "react-router-dom"
import { createTest } from "../../util/api/test"
import { toast } from "react-toastify"

const TestPopup = () => {
    
    const dispatch = useDispatch()
    
    const state = useSelector(state => state.popup)    
    const projectState = useSelector(state => state.project)
    
    const [page, setPage] = useState(0)
    
    const [test, setTest] = useState({
        name : "",
        maxPart : "",
        password : "",
        selCriteria : ""
    })
    
    const [code, setCode] = useState("")
    
    
    const [images1, setImages1] = useState("");
    const [images2, setImages2] = useState("");
    const [images3, setImages3] = useState("");
    
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

    const setSelCritreria = (e) => {
        setTest({...test, selCriteria: e.target.value})
    }
    
    const closeHandler = () => {
        dispatch(close())
        setPage(0)
        setTest({})
    }
    
    const next = () => {

        if(test.name.length === 0) {
            toast.warning("Please enter test name!")
            return
        } else if (test.name.length > 10) {
            toast.warning("Please write test name within 10 character")
            return
        }

        if(test.maxPart.length === 0) {
            toast.warning("Please enter Max Participants!")
            return
        } else if (parseInt(test.maxPart) > 50){
            toast.warning("Please write Max participants under 50")
            return
        }

        if(test.password.length === 0) {
            toast.warning("Please enter password!")
            return
        } else if (test.password.length > 12) {
            toast.warning("Please write password within 12 character")
            return
        }

        if(projectState.preProject.adminCode !== code) {
            toast.error("Admin code is not correct!")
            return
        }

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
            opacity:  state.popup.show ? 1 : 0,
        }} className="overlay">
            
            <div className="popup" style={{
                // height: page === 2 ? "80vh" : "50vh"
                

            }}>

                <div className="popup-title">
                    New Test
                </div>
                
                {
                    page === 0 ? 
                    <div className="sec1" style={{
                        paddingTop: "2vh"
                    }}>

                        <div className="insert-container">
                            <div className="insert-info" id="test-name">
                                test name
                            </div>
                            <input type="text" 
                            id="popup-test-name" 
                            className="popup-input" 
                            onChange={setName} 
                            value={test.name || ""}/>
                        </div>

                        <div className="insert-container">
                            <div className="insert-info" id="test-max-part">
                                max participants
                            </div>
                            <input type="text" 
                            name="maxPart" 
                            id="popup-max-part" 
                            className="popup-input" 
                            onChange={setMaxPart}
                            value={test.maxPart || ""}/>
                        </div>

                        <div className="insert-container">
                            <div className="insert-info" id="test-password">
                                password
                            </div>
                            <input type="text" 
                            name="password" 
                            id="popup-test-password" 
                            className="popup-input" 
                            onChange={setPassword} 
                            value={test.password || ""}/>
                        </div>

                        <div className="insert-container">
                            <div className="insert-info" id="test-admin-code"> 
                                admin code
                            </div> 
                            <input type="text" 
                            id="popup-test-admin-code" 
                            className="popup-input" 
                            onChange={setAdminCode} /> 
                        </div>

                    </div> 
                    : page === 1 ?
                    <div className="sec1" style={{
                        paddingTop: "8vh"
                    }}> 
                        <div className="desc-insert" id="test-files"> 
                            Files
                        </div> 
                        <div className="insert-container">
                            <div className="insert-info" id="test-dir1"> 
                                directory 1
                            </div> 
                            <input type="text" 
                            id="popup-test-dir1" 
                            className="popup-input" 
                            value={images1.name || ""}
                            disabled/>
                        </div>
                        
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
                        <div className="insert-container">
                            <div className="insert-info" id="test-dir2">
                                directory 2
                            </div>
                            <input type="text" 
                            id="popup-test-dir2" 
                            className="popup-input" 
                            disabled 
                            value={images2.name || ""}/>
                        </div>

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

                        <div className="insert-container">
                            <div className="insert-info" id="test-csv">
                                prompt csv
                            </div>
                            <input type="text" 
                            id="popup-test-csv" 
                            className="popup-input" 
                            disabled
                            value={images3.name || ""}
                            />
                        </div>

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
                    : 
                    <div className="sec1">
                        <div className="insert-container">
                            <div className="insert-info" id="criteria-sel">
                                selection criteria
                            </div>

                            <input type="text"
                            className="popup-input"
                            id="popup-criteria"
                            onChange={setSelCritreria}
                            />
                        </div>

                        <div className="desc-insert" id="method-sel">
                            Selection method
                        </div>
                        <div className="methods">
                            <img src="/images/vs.svg" alt="vs" id="vs"/>
                            
                            <img src="/images/likert.svg" alt="likert" id="likert"/>
                        </div>
                    </div>
                }
                {/*  <div className="sec1">
                     <div>
                         <img src="/images/mixed.svg" alt="mixed" id="mixed"/>

                         <img src="/images/identical.svg" alt="identical" id="identical"/>
                     </div> 
                 </div> */}

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
                page < 2 ? 
                <button className="common-button popup-next" onClick={next}>
                NEXT
                </button> :
                <button 
                className="common-button popup-done" 
                onClick={create} 
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