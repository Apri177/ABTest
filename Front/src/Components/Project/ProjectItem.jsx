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
        </Link>
    )
}


export default ProjectItem