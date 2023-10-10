import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { close } from "../../store/popupStore"
import '../../styles/popup.scss'


const ProjectPopup = () => {

    // reducer 작성하긴했는데 수정해야 함

    const dispatch = useDispatch()

    const popupState = useSelector(state => state.popup)



    const closeHandler = () => {
        dispatch(close())
    }

    
    const [page, setPage] = useState(0)
    
    const next = () => {
        setPage(page + 1)
    }

    const back = () => {
        setPage(page - 1)
    }



    return(
        <div
        style={{
            // visibility: popupState.popup.show ? "visible" : "hidden", 
            // opacity:  popupState.popup.show ? 1 : 0
            visibility: "visible",
            opacity: 1
        }} className="overlay">
            <div className="popup" style={{
                height: page ? "50vh" : "40vh"
            }}>
                <div className="popup-title">
                    New Project
                </div>
                
                {
                    page === 0
                    ?
                    <div className="sec1">
                        <div className="desc-insert" id="admincode">
                            Enter admin code
                        </div>
                        <div className="insert-info" id="admin-code">
                            admin code
                        </div>
                        <input id="popup-admin-code" className="popup-input" placeholder="enter the admin code"/>
                    </div>

                    :

                    <div className="sec1">

                        <div className="insert-info" id="project-name">
                            project name
                        </div>
                        <input type="text" name="projectName" className="popup-input" id="popup-project-name"/>
                        <div className="insert-info" id="notes">
                            notes
                        </div>
                        <input type="text" name="notes" className="popup-input" id="popup-notes" />

                        <div>

                        </div>

                    </div>

                }


                <div className="sec2">
                    {
                        page === 0 ? 
                        <button className="popup-cancel" onClick={closeHandler}>
                            cancel
                        </button>
                        :
                        <button className="popup-cancel" onClick={back}>
                            back
                        </button>

                    }
                    {
                        page === 0 ? 
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


export default ProjectPopup