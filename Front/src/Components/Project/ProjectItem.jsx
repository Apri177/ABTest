import { Link } from 'react-router-dom'
import '../../styles/project.scss'

const ProjectItem = ({id, name, content, updateDate}) => {

    return (
        <Link className="project-item"
        style={{
            textDecoration: "none",
            color: 'black'
        }}
        to={`/project/${id}`}>
            <div className='project-name'>
                {name}  
            </div>
            <div className='project-desc'>
                {content}
            </div>
            <div style={{
                position: "absolute",
                bottom: "3vh"
            }}>
                <p style={{
                    margin: "0",
                    fontWeight: "300",
                    fontSize: "1.75vmin"
                }}>
                    last update
                </p>
                <p style={{
                    margin: "0",
                    fontWeight: "300",
                    fontSize: "1.7vmin"
                }}>
                    {updateDate}
                </p>
            </div>
        </Link>
    )
}


export default ProjectItem