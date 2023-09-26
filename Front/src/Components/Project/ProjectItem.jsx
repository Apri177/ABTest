import { useDispatch, useSelector } from 'react-redux'
import '../../styles/project.scss'

const ProjectItem = ({name, content, updateDate}) => {

    //dispatch, selector로 전체 project 불러오기 구현 중


    return (
        <div className="project-item">
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