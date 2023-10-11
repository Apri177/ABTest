import { useEffect, useState } from 'react'
import ProjectItem from '../Components/Project/ProjectItem'
import CreateButton from '../Components/Button/CreateButton'
import Search from '../Components/Project/Search'
import { useDispatch, useSelector } from 'react-redux'


const ProjectContainer = () => {

    const dispatch = useDispatch()
    const projectState = useSelector(state => state.project)

    return (
        <div className="project-container">
            <Search>
                
            </Search>

            <CreateButton content={"new project"}/>
            <div className="project-contents-container">
                {
                    projectState.projects.map((item, temp) => {
                        return (
                            <ProjectItem key={temp} name={item.name} content={item.content} updateDate={item.updateDate} id={item.id}/>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default ProjectContainer