import '../styles/test.scss'
import CreateButton from '../Components/Button/CreateButton'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import TestItem from '../Components/Test/TestItem'
import { useEffect } from 'react'
import { getTests } from '../util/api/test'
import { getPreProjectState, setPreProjectState, setTests } from '../store/projectStore'
import { getProjectById } from '../util/api'

const TestContainer = () => {

    const dispatch = useDispatch()
    const projectState = useSelector(state => state.project)
    const param = useParams()

    useEffect(() => {        
        const res = getProjectById(param.project_id)
        res.then((res) => {
            dispatch(setPreProjectState(res.data))
            dispatch(setTests(projectState.preProject.tests))
            
        })
    }, [])

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
            <div className='test-content-container'>
                {
                    projectState.preProject.tests && projectState.preProject.tests.map((item, temp) => {
                        return (
                            <TestItem name={item.name} dir1={item.image1.uploadFilename} dir2={item.image2.uploadFilename} key={temp}/>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default TestContainer