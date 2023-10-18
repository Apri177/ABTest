import { useParams } from 'react-router-dom'
import '../../styles/entertest.scss'
import { useEffect, useState } from 'react'
import { getTestsImage } from '../../util/api/test'

const Test = () => {

    const [page,setPage] = useState(1)
    const [image1, setImage1] = useState("")
    const [image2, setImage2] = useState("")

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
            console.log(res);

            setImage1(res[0].body.file)
            setImage2(res[1].body.file)

            console.log(image1);
            console.log(image2);
        })
    }, [])



    return (
        <div className="ground">
            <div className='test-box'>
                <div className='sec1'>
                    <div className='prompt-box'>
                        insert something
                    </div>
                </div>
                <div className='sec2'>
                    <img src={"http://localhost:8080/image?imageName="} alt="사진1" className='test-image'/>
                    <div style={{
                        width: "3vw"
                    }}>

                    </div>
                    <img src={"http://localhost:8080/image?imageName=" + image2} alt="사진2" className='test-image'/>
                </div>
                <div className='sec3'>
                    <p style={{
                        fontWeight: "300",
                    }}>
                        asdfasdf
                    </p>

                    
                    <button className='common-button' id='test-back'>
                        <img src="/images/button-icon-arrow-back.svg" alt="asdf" />
                        back
                    </button>

                    <button className='common-button' id='test-next'>
                        next
                        <img src="/images/button-icon-arrow-forward.svg" alt="asdf" />
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Test