import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { close } from "../../store/popupStore"
import '../../styles/popup.scss'
import { createProject, getProjects } from "../../util/api"
import { getProjectState, setProjectState } from "../../store/projectStore"

const ProjectPopup = () => {

    // reducer 작성하긴했는데 수정해야 함

    const dispatch = useDispatch()

    const popupState = useSelector(state => state.popup)

    const projectState = useSelector(state => state.project)

    const [page, setPage] = useState(0)

    const closeHandler = () => {
        dispatch(close())
        
        setPage(0)
        setAdminCode("")
        setName("")
        setContent("")
    }
    
    const next = () => {
        setPage(page + 1)
    }

    const back = () => {
        setPage(page - 1)
    }

    const [adminCode, setAdminCode] = useState("")
    const [name, setName] = useState("")
    const [content, setContent] = useState("")

    const saveAdminCode = (e) => {
        setAdminCode(e.target.value)
    }

    const saveName = (e) => {
        setName(e.target.value)
    }

    const saveContent = (e) => {
        setContent(e.target.value)
    }

    useEffect(() => {
        const res = getProjects()
        res.then((res) => {
            dispatch(setProjectState(res.data))
        })
    }, [])

    const create = async () => {
        try{
            if(adminCode.length !== 0 
                && 
                name.length !== 0
                &&
                content.length !== 0) {
                    await createProject(projectState.projects.at(-1).id + 1, adminCode, name, content)
                }
        } catch (e) {
            if(adminCode.length !== 0 
                && 
                name.length !== 0
                &&
                content.length !== 0) {
                    await createProject(0, adminCode, name, content)
                }
        }
        const res = getProjects()
        res.then((res) => {
            dispatch(setProjectState(res.data))
        })
        closeHandler()
    }


    return(
        <div
        style={{
            visibility: popupState.popup.show ? "visible" : "hidden", 
            opacity:  popupState.popup.show ? 1 : 0
            // visibility: "visible",
            // opacity: 1
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
                        <input id="popup-admin-code" 
                        className="popup-input" 
                        placeholder="enter the admin code"
                        onChange={saveAdminCode}
                        value={adminCode}/>
                    </div>

                    :

                    <div className="sec1">

                        <div className="insert-info" id="project-name">
                            project name
                        </div>
                        <input type="text" 
                        name="projectName" 
                        className="popup-input" 
                        id="popup-project-name"
                        onChange={saveName}
                        value={name}/>
                        <div className="insert-info" id="notes">
                            notes
                        </div>
                        <input type="text" 
                        name="notes" 
                        className="popup-input" 
                        id="popup-notes" 
                        onChange={saveContent}
                        value={content}/>
                    </div>

                }


                <div className="sec2">
                    
                    {
                        page === 0 ? 
                        <button className="common-button popup-cancel"
                        onClick={closeHandler}>
                            cancel
                        </button>
                        :
                        <button className="common-button popup-cancel"
                        onClick={back}>
                            back
                        </button>
                    }

                    {
                        page === 0 ? 
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


export default ProjectPopup