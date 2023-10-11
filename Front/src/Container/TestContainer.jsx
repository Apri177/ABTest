import '../styles/test.scss'
import CreateButton from '../Components/Button/CreateButton'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const TestContainer = () => {

    const projectState = useSelector(state => state.project)


    return (
        <div className="test-container">
            <div className="project-name">
                <Link to={'/'}>
                    <img src="/images/back-icon.svg" alt="back_icon" style={{
                        marginLeft: "3vw",
                        marginRight: "1vw"
                    }}/>
                </Link>
                {projectState.preProject.name}
            </div>
            <CreateButton content={"new test"}/>

            <div className='test-content-container'>
                <div id='content-header'>
                    <dl>
                        <dt id='name'>
                            name
                        </dt>
                        <dt id='dir1'>
                            directory 1
                        </dt>
                        <dt id='dir2'>
                            directory 2
                        </dt>
                        <dt id='partic'>
                            participants
                        </dt>
                        <dt id='date'>
                            created
                        </dt>
                    </dl>
                    
                </div>
            </div>

        </div>
    )
}


export default TestContainer