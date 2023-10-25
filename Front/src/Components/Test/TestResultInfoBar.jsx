

const TestResultInfoBar = ({testName}) => {
    return (
        <div className="info-bar-container">
            <div className="info-bar"
            style={{
                justifyContent: "center"
            }}>
                {testName}
            </div>
        </div>
    )
}


export default TestResultInfoBar