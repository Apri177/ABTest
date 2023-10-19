import { useParams } from 'react-router-dom'
import '../../styles/entertest.scss'
import { useEffect, useState } from 'react'
import { getTestsImage } from '../../util/api/test'

const Test = () => {

    const [page,setPage] = useState(1)
    const [image1, setImage1] = useState("")
    const [image2, setImage2] = useState("")
    const [image1ContentType, setImage1ContentType] = useState("")
    const [iamge2ContentType, setImage2ContentType] = useState("")

    const param = useParams()

    const back = () => {
        setPage(page - 1)
    }

    const next = () => {
        setPage(page + 1)
    }

    useEffect(() => {

        const res = getTestsImage(param.project_id, param.test_name, page)
        res.then((res) => {
            setImage1(res[0].body)
            setImage2(res[1].body)
            setImage1ContentType(res[0].headers.ContentType)
            setImage2ContentType(res[1].headers.ContentType)
        })
    }, [page, ])
    



    return (
        <div className="ground">
            <div className='test-box'>
                <div className='sec1'>
                    <div className='prompt-box'>
                        insert something
                    </div>
                </div>
                <div className='sec2'>
                    <img src={`data:${image1ContentType};base64,${image1}`} alt="사진1" className='test-image'/>
                    <div style={{
                        width: "3vw"
                    }}>

                    </div>
                    <img src={ `data:${iamge2ContentType};base64,${image2}` } alt="사진2" className='test-image'/>
                </div>
                <div className='sec3'>
                    <p style={{
                        fontWeight: "300",
                    }}>
                        asdfasdf
                    </p>

                    {
                        page === 1 ? 
                        null
                        :
                        <button className='common-button' id='test-back' onClick={back}>
                            <img src="/images/button-icon-arrow-back.svg" alt="asdf" />
                            back
                        </button>
                    }
                    {
                        
                    }
                    <button className='common-button' id='test-next' onClick={next}>
                        next
                        <img src="/images/button-icon-arrow-forward.svg" alt="asdf" />
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Test