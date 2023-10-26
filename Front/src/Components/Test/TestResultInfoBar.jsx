import { Link } from "react-router-dom"



const TestResultInfoBar = ({param, testName}) => {

    return (
        <div className="info-bar-container">


            <div className="info-bar"
            style={{
                position: "relative",
                justifyContent: "center"
            }}>
                <Link to={`/project/${param.project_id}`} style={{
                    position: "absolute",
                    left: "1vw"
                }}>
                    <img src="/images/back-icon.svg" alt="back_icon" style={{
                        marginLeft: "3vw",
                        marginRight: "1vw"
                    }}/>
                </Link>
                {testName}
            </div>
        </div>
    )
}


export default TestResultInfoBar