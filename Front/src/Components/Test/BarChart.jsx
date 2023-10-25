import { useEffect, useState } from "react"

const BarChart = ({per, sum}) => {

    const [score, setScore] = useState(0)

    useEffect(() => {
        setScore(per / sum)
    }, [per, score, sum])


    return (
        <div className="bar-chart">
            <div id="orange" style={{
                width: `${score * 100}%`
            }}></div>

            <div id="soda" style={{
                width: `${100 - (score * 100)}%`
            }}></div>
        </div>
    )
}

export default BarChart
