import { Link, useParams } from 'react-router-dom'
import '../../styles/test.scss'
import { useEffect, useState } from 'react'
import { getTestById } from '../../util/api/test'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'


const TestItem = ({name, dir1, dir2, maxPart, updateDate}) => {

    const param = useParams()

    const testState = useSelector(state => state.test)

    const [tester, setTester] = useState(0)

    useEffect(() => {
        const res = getTestById(param.project_id, name)
        res.then((rst) => {
            setTester(rst.data.tester)
        })
    }, [name, param.project_id, testState])

    const noResultHandler = (e) => {
        toast.warn(`Result doesn't exist!`)
        return
    }

    return (
        <div className="test-item">

            <div className="test-name" id="name">
                {name}
            </div>

            <div className="test-dir1" id="dir1">
                {dir1}
            </div>

            <div className="test-dir2" id="dir2">
                {dir2}
            </div>

            <div className='tester' id='partic'>
                123
            </div>

            <div className="update-date" id="date">
                {updateDate}
            </div>


            <Link to={`/project/${param.project_id}/test/${name}/play`}>
                <img src="/images/play.svg" alt="play" id='play'/>
            </Link>

            {
                tester > 0 ?
                <Link to={`/project/${param.project_id}/test/${name}/result`}>
                    <img src="/images/result.svg" alt="result" id="result"/>
                </Link> :

                <img src="/images/result.svg" alt="result" id="result" onClick={noResultHandler}/>
            }

        </div>
    )
}

   
export default TestItem