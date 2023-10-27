import '../styles/test.scss'
import CreateButton from '../Components/Button/CreateButton'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import TestItem from '../Components/Test/TestItem'
import { useEffect } from 'react'
import { setPreProjectState } from '../store/projectStore'
import { getProjectById } from '../util/api'
import { setTestState } from '../store/testStore'

const TestContainer = () => {

    const dispatch = useDispatch()
    const projectState = useSelector(state => state.project)
    const testState = useSelector(state => state.test)
    const param = useParams()

    useEffect(() => {        
        const res = getProjectById(param.project_id)
        res.then((res) => {
            console.log(res);
            dispatch(setPreProjectState(res.data))
            dispatch(setTestState(res.data.tests))
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

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

            <div className='temp-container'>
                <CreateButton content={"new test"}/>
            </div>
            <div id='content-header'>
                {/* CSS Upper Case */}
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
                        updated
                    </dt>
                </dl>    
            </div>
            <div className='test-content-container'>
                {
                    testState.tests && testState.tests.map((item, temp) => {
                        return (
                            <TestItem 
                            name={item.name} 
                            dir1={item.image1.uploadFilename} 
                            dir2={item.image2.uploadFilename} 
                            updateDate={item.updateDate} 
                            key={temp}/>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default TestContainer