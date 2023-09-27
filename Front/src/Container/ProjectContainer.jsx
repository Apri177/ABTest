import { useState } from 'react'
import ProjectItem from '../Components/Project/ProjectItem'


const ProjectContainer = () => {

    const [ visibility, setVisibility ] = useState(false)

    const popupCloseHandler = (e) => {
        setVisibility(e)
    }

    return (
        <div className="project-container">
            <div className="project-contents-container">
                <ProjectItem name={"1234"} content={"asdflkjasdflkjadsflkj"} updateDate={"11:00, 2022-10-20"}/>
                <ProjectItem name={"45667"} content={"qwepiouqwepoiqwepoi"} updateDate={"10:22, 2023-10-22"}/>
            </div>
        </div>
    )
}


export default ProjectContainer