import { useEffect, useState } from "react"

const BarChart = ({per, sum}) => {

    const [score, setScore] = useState(0)

    useEffect(() => {
        setScore(per * (100 / sum))
    }, [per, score, sum])


    return (
        <div className="bar-chart">
            <div id="orange" style={{
                width: `${score}%`
            }}></div>

            <div id="soda" style={{
                width: `${100 - score}%`
            }}></div>
        </div>
    )
}

export default BarChart
