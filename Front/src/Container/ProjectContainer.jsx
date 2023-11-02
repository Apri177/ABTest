import ProjectItem from '../Components/Project/ProjectItem'
import CreateButton from '../Components/Button/CreateButton'
import Search from '../Components/Project/Search'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProjects } from '../util/api/project'
import { setProjectState } from '../store/projectStore'


const ProjectContainer = () => {

    const projectState = useSelector(state => state.project)
    const dispatch = useDispatch(state => state.project)
    
    useEffect(() => {
        const res = getProjects()
        res.then((res) => {
            dispatch(setProjectState(res.data))
        })
    }, [dispatch])


    return (
        <div className="project-container">
            <Search>
                
            </Search>

            <CreateButton content={"new project"}/>
            <div className="project-contents-container">
                {
                    projectState.projects && projectState.projects.map((item, temp) => {
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