import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { close } from "../../store/popupStore"
import '../../styles/popup.scss'
import { createProject, getProjects } from "../../util/api"
import { setProjectState } from "../../store/projectStore"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        if(adminCode.length === 0) {
            toast.warning("Please enter admincode")
            return
        } else if(adminCode.length > 10) {
            toast.warning("Please write admin code within 10 characters.")
            return
        }
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
    }, [dispatch])

    const create = async () => {
        if(name.length === 0) {
            toast.warning("Please enter Project name")
            return
        } else if(name.length > 10) {
            toast.warning("Please write name within 10 characters.")
            return
        }
        if(content.length > 50) {
            toast.warning("Please write Project notes within 50 characters.")
            return    
        }

        try{
            await createProject(projectState.projects.at(-1).id + 1, adminCode, name, content)
        } catch (e) {
            await createProject(0, adminCode, name, content)    
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
        }} className="overlay">
            <div className="popup" style={{
                height: "21vmax",
                width: "25vmax"
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