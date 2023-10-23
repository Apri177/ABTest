import { useNavigate, useParams } from 'react-router-dom'
import '../../styles/entertest.scss'
import { useEffect, useState } from 'react'
import { getTestById, getTestsImage, postTestResult } from '../../util/api/test'
import { ToastContainer, toast } from 'react-toastify'

const Test = () => {

    const navigate = useNavigate()

    const [page,setPage] = useState(1)

    const [imgInfo1, setImgInfo1] = useState({
        image: String,
        ContentType: String,
        Model: String
    })

    const [imgInfo2, setImgInfo2] = useState({
        image: String,
        ContentType: String,
        Model: String
    })
    
    const [prompt, setPrompt] = useState("")
    const [sets, setSets] = useState(0)
    const [result, setResult] = useState([])
    const [x, setX] = useState("")

    const param = useParams()

    const back = () => {
        setPage(page - 1)
        let array = [...result];
        let index = array.length - 1
        setX(array[index])
        array.splice(index, 1)
        setResult(array)
    }

    const next = () => {
        if(x === "") {
            toast.warning("Select one!")
            return
        }
        setPage(page + 1)
        setResult([...result, x])
        setX("")
    }

    const finish = async () => {

        toast.success("Successfully over")

        await postTestResult(param.project_id, param.test_name, result, imgInfo1.Model)

        navigate(`/project/${param.project_id}/test/${param.test_name}/result`)
    }

    const radioHandler = (e) => {
        setX(e.target.value);
    }

    useEffect(() => {

        const test = getTestById(param.project_id, param.test_name)
        test.then((res) => {
            setSets(res.data.numOfSets)
        })

        const res = getTestsImage(param.project_id, param.test_name, page)
        res.then((res) => {
            setImgInfo1({
                image: res[0].body,
                ContentType: res[0].headers.ContentType,
                Model: res[0].headers.Model
            })
            setImgInfo2({
                image: res[1].body,
                ContentType: res[1].headers.ContentType,
                Model: res[1].headers.Model
            })
            setPrompt(res[0].headers.prompt[0])
        })

        console.log(result);
    }, [page, ])
    

     return (
         <div className="ground">
             <ToastContainer
                 position="top-right" // 알람 위치 지정
                 autoClose={3000} // 자동 off 시간
                 hideProgressBar={false} // 진행시간바 숨김
                 closeOnClick // 클릭으로 알람 닫기
                 rtl={false} // 알림 좌우 반전
                 draggable // 드래그 가능
                 pauseOnHover // 마우스를 올리면 알람 정지
                 theme="light"
                //  limit={1} // 알람 개수 제한
             />
            <div className='test-box'>
                <div className='sec1'>
                    <div className='prompt-box'>
                        {prompt}
                    </div>
                </div>
                <div className='sec2'>
                    <label htmlFor="image1">
                        <img src={`data:${imgInfo1.ContentType};base64,${imgInfo1.image}`} 
                        alt="사진1" 
                        className='test-image'
                        />
                        {
                            x === imgInfo1.Model[0] ? 
                            <img src="/images/set-status.svg" alt="checked" id="check-1"/>
                            :
                            null
                        }
                    </label>
                    <input type="radio" 
                    id="image1" 
                    defaultValue={imgInfo1.Model[0]}
                    onChange={radioHandler}
                    checked={x === imgInfo1.Model[0]}
                    style={{
                        display: "none"
                    }}/>

                    <label htmlFor="image2">
                        <img src={ `data:${imgInfo2.ContentType};base64,${imgInfo2.image}` } 
                        alt="사진2" 
                        className='test-image'
                        />
                        {
                            x === imgInfo2.Model[0] ?
                            <img src="/images/set-status.svg" alt="checked" id="check-2"/>
                            :
                            null
                        }
                    </label>
                    <input type="radio"
                    id="image2"
                    defaultValue={imgInfo2.Model[0]}
                    onChange={radioHandler}
                    checked={x === imgInfo2.Model[0]}
                    style={{
                        display: "none"
                    }}
                    />

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
                        page !== sets ?
                            <button className='common-button' id='test-next' onClick={next}>
                                next
                                <img src="/images/button-icon-arrow-forward.svg" alt="asdf" />
                            </button> :
                            <button className='common-button' id='test-next' onClick={finish}>
                                finish
                            </button>

                    }
                </div>
            </div>

        </div>
    )
}


export default Test