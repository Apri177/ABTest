import { useState } from 'react'
import ProjectItem from '../Components/Project/ProjectItem'
import CreateButton from '../Components/Button/CreateButton'
import Search from '../Components/Project/Search'


const ProjectContainer = () => {

    const [ visibility, setVisibility ] = useState(true)

    const popupOpenHandler = () => {
        setVisibility(true)
        console.log("popup open");
    }

    const popupCloseHandler = (e) => {
        setVisibility(false)
        console.log("popup close");
    }

    return (
        <div className="project-container">
            <Search>
                
            </Search>

            <CreateButton content={"new project"}/>
            <div className="project-contents-container">

                <ProjectItem name={"1234"} content={"asdflkjasdflkjadsflkj"} updateDate={"11:00, 2022-10-20"}/>
                <ProjectItem name={"45667"} content={"qwepiouqwepoiqwepoi"} updateDate={"10:22, 2023-10-22"}/>


            </div>
        </div>
    )
}


export default ProjectContainer