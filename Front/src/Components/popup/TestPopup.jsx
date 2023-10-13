import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { close } from "../../store/popupStore"
import '../../styles/popup.scss'
import { json, useParams } from "react-router-dom"
import { createTest } from "../../util/api/test"


const TestPopup = () => {

    // reducer 작성하긴했는데 수정해야 함

    const dispatch = useDispatch()

    const state = useSelector(state => state.popup)
    
    const [page, setPage] = useState(0)
    
    const [test, setTest] = useState({
        
    })

    const [code, setCode] = useState("")

    const [images, setImages] = useState({

    })

    let formdata = new FormData()
    
    const setName = (e) => {
        // formdata.append("body", e.target.value)
        setTest({...test, name: e.target.value})
    }
    
    const setMaxPart = (e) => {
        // formdata.append("body", e.target.value)
        setTest({...test, maxPart : e.target.value})
    }
    
    const setPassword = (e) => {
        // formdata.append("body", e.target.value)
        setTest({...test, password : e.target.value})
    }

    const setAdminCode = (e) => {
        setCode(e.target.value)
    }
    
    const setFile1 = (e) => {

        // formdata.append("images", e.target.files.length && e.target.files[0])
        setImages({...images, imageFiles1 : e.target.files[0]})
        // setTest({...test, file1: e.target.files[0]})
        console.log(e.target.files[0]);
    }
    
    const setFile2 = (e) => {
        // formdata.append("images", e.target.files.length && e.target.files[0])
        setImages({...images, imageFiles2 : e.target.files[0]})
        // setTest({...test, file2: e.target.files[0]})
        console.log(e.target.files[0]);
    }
    
    const setFile3 = (e) => {
        // formdata.append("images", e.target.files.length && e.target.files[0])
        setImages({...images, promptFile : e.target.files[0]})
        // setTest({...test, file2: e.target.files[0]})
        console.log(e.target.files[0]);
    }
    
    const closeHandler = () => {
        dispatch(close())
        setPage(0)
        setTest({})
    }
    
    const next = () => {
        setPage(page + 1)
        if(page === 1) {
            formdata.append("body", JSON.stringify(test))
            formdata.append("images", JSON.stringify(images))
            for(let key of formdata.keys()) {
                console.log( key + " : "+formdata.get(key) );
            }

        }
    }

    const back = () => {
        setPage(page - 1)
    }

    const param = useParams()

    const create = async() => {
        const res = await createTest(param.id, test, images)
        console.log(res);
    }
    
    return(
        <div
        style={{
            // visibility: state.popup.show ? "visible" : "hidden", 
            // opacity:  state.popup.show ? 1 : 0
            visibility: "visible",
            opacity: 1
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
                        name="test-name" 
                        id="popup-test-name" 
                        className="popup-input" 
                        onChange={setName} 
                        value={test.name}/>

                        <div className="insert-info" id="test-max-part">
                            max participants
                        </div>
                        <input type="text" 
                        name="max-participants" 
                        id="popup-max-part" 
                        className="popup-input" 
                        onChange={setMaxPart} 
                        value={test.maxPart}/>

                        <div className="insert-info" id="test-password">
                            password
                        </div>
                        <input type="text" 
                        name="password" 
                        id="popup-test-password" 
                        className="popup-input" 
                        onChange={setPassword} 
                        value={test.password}/>

                        <div className="insert-info" id="test-admin-code">
                            admin code
                        </div>
                        <input type="text" 
                        name="admin-code" 
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
                        <input type="text" id="popup-test-dir1" className="popup-input" disabled />
                        
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
                    <button className="common-button popup-done" type="submit" onClick={create}>
                        DONE
                    </button>
                    }
                </div>
            </div>
        </div>
    )
}


export default TestPopup