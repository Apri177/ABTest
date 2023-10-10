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
                
                {/* {
                page == 1 ? 
                    <div className="sec1">
                        <div className="insert-info" id="test-name">
                            test name
                        </div>
                        <input type="text" name="test-name" id="popup-test-name" className="popup-input" />

                        <div className="insert-info" id="test-max-part">
                            max participants
                        </div>
                        <input type="text" name="max-participants" id="popup-max-part" className="popup-input"/>

                        <div className="insert-info" id="test-password">
                            password
                        </div>
                        <input type="text" name="password" id="popup-test-password" className="popup-input"/>

                        <div className="insert-info" id="test-admin-code">
                            admin code
                        </div>
                        <input type="text" name="admin-code" id="popup-test-admin-code" className="popup-input"/>
                    </div>
                    : page == 2 ?
                    <div className="sec1">
                        <div className="desc-insert" id="test-files">
                            Files
                        </div>

                        <div className="insert-info" id="test-dir1">
                            directory 1
                        </div>
                        <input type="text" name="dir1" id="popup-test-dir1" className="popup-input" disabled/>
                        <img src="images/icon-upload-file.svg" alt="file upload" style={{
                            maxWidth:"2vw",
                        }} id="upload1"/>


                        <div className="insert-info" id="test-dir2">
                            directory 2
                        </div>
                        <input type="text" name="dir2" id="popup-test-dir2" className="popup-input" disabled/>
                        <img src="images/icon-upload-file.svg" alt="file upload" style={{
                            maxWidth:"2vw",
                        }} id="upload2"/>

                        <div className="insert-info" id="test-csv">
                            prompt csv
                        </div>
                        <input type="text" name="prom-csv" id="popup-test-csv" className="popup-input" disabled/>
                        <img src="images/icon-upload-file.svg" alt="file upload" style={{
                            maxWidth:"2vw",
                        }} id="upload3"/>
                    </div>
                    : page == 3 ?


                } */}
                
                {/* <div className="sec1">
                    <div className="insert-info">
                        number of sets
                    </div>

                    <input type="text" className="popup-input" />

                    <div className="desc-insert">
                        Comparison method
                    </div>

                    <img src="" alt="comparison" />

                    <div className="desc-insert">
                        Test configuration
                    </div>

                    <img src="" alt="mixed" />

                    <img src="" alt="identical" />
                </div> */}

                <div className="sec1">
                    <div className="insert-info" id="criteria sel">
                        selection criteria
                    </div>

                    <input type="text" className="popup-input" id="criteria"/>

                    <div className="desc-insert" id="method sel">
                        Selection method
                    </div>

                    <img src="" alt="vs" id="vs"/>
                    
                    <img src="" alt="likert" id="likert"/>
                </div>



                <div className="sec2">
                    {
                        page < 1 ? 
                        <button className="popup-cancel" onClick={closeHandler}>
                            cancel
                        </button>
                        :
                        <button className="popup-cancel" onClick={back}>
                            back
                        </button>

                    }
                    {
                        page < 3 ? 
                    <button className="popup-general" onClick={next}>
                        NEXT
                    </button> :
                    <button className="popup-general" type="submit">
                        DONE
                    </button>
                    }
                    

                </div>
            </div>
        </div>
    )
}


export default TestPopup