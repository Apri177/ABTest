import { Link } from 'react-router-dom'
import '../../styles/project.scss'
import { useState } from 'react'

const ProjectItem = ({id, name, content, updateDate}) => {

    const [moreState, setMoreState] = useState(false)

    const moreHandler = (e) => {
        setMoreState(!moreState)
    }

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
                <p>
                    {content}
                </p>
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

            <img src="/images/more.svg" alt="more"
                id='more'
                onClick={moreHandler}
            />

        </Link>
    )
}


export default ProjectItem