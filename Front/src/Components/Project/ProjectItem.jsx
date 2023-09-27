import { useDispatch, useSelector } from 'react-redux'
import '../../styles/project.scss'
import { useState } from 'react'
import Popup from '../popup/Popup'

const ProjectItem = ({name, content, updateDate}) => {

    //dispatch, selector로 전체 project 불러오기 구현 중

    const [ visibility, setVisibility ] = useState(false)

    const popupCloseHandler = (e) => {
        setVisibility(e)
    }

    return (
        <div className="project-item" onClick={(e) => setVisibility(!visibility)}>
            <div className='project-name'>
                {name}  
            </div>
            <div className='project-desc'>
                {content}
            </div>
            <div>
                <p style={{
                    fontWeight: "300",
                    marginBottom: "0.25vh",
                    fontSize: "0.75vmax"
                }}>
                    last update
                </p>
                <p style={{
                    fontWeight: "300",
                    marginTop: "1vh",
                    fontSize: "1vmax"
                }}>
                    {updateDate}
                </p>
            </div>
        </div>
    )
}


export default ProjectItem