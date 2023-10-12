import '../../styles/test.scss'


const TestItem = ({name, dir1, dir2, updateDate}) => {
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

            <div className="update-date" id="date">
                {updateDate}
            </div>
            
            <img src="/images/play.svg" alt="play" id='play'/>

            <img src="/images/result.svg" alt="result" id="result"/>
        </div>
    )
}

   
export default TestItem