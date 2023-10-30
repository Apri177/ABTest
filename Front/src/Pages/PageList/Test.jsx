import { useNavigate, useParams } from 'react-router-dom'
import '../../styles/entertest.scss'
import { useEffect, useState } from 'react'
import { getTestById, getTestsImage, postTestResult } from '../../util/api/test'
import { toast } from 'react-toastify'

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
    const [testType, setTestType] = useState("vs")


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
    }, [page, param.project_id, param.test_name])
    

     return (
         <div className="ground">
            <div className='test-box'>
                <div className='sec1'>
                    <div className='prompt-box'>
                        {prompt}
                    </div>
                </div>
                
                <div className='sec2'>
                    <div className='image'> 
                        <label htmlFor="image1" className='test-image'>
                            <img src={`data:${imgInfo1.ContentType || ""};base64,${imgInfo1.image || ""}`} 
                            alt="사진1" 
                            id='image-1'
                            />

                            {
                                x === imgInfo1.Model[0] ? 
                                <img src="/images/set-status.svg" alt="checked" className='check'/>
                                :
                                null
                            }
                        </label>


                    </div>

                    {
                        testType === "vs" ? 
                        <input type="radio" 
                        id="image1" 
                        defaultValue={imgInfo1.Model[0]}
                        onChange={radioHandler}
                        checked={x === imgInfo1.Model[0]}
                        style={{
                            display: "none"
                        }}/> : 
                        null
                    }


                    <div className='image'>
                        <label htmlFor="image2" className='test-image'>
                            <img src={ `data:${imgInfo2.ContentType || ""}; base64,${imgInfo2.image || ""}` } 
                            alt="사진2" 
                            id='image-2'
                            />
                            {
                                x === imgInfo2.Model[0] ?
                                <img src="/images/set-status.svg" alt="checked" className='check'/>
                                :
                                null
                            }
                        </label>
                    </div>

                    {
                        testType === "vs" ?
                            <input type="radio"
                            id="image2"
                            defaultValue={imgInfo2.Model[0]}
                            onChange={radioHandler}
                            checked={x === imgInfo2.Model[0]}
                            style={{
                                display: "none"
                            }} />
                            : 
                            null
                    }

                </div>

                <div className='sec3'>
                    <p style={{
                        fontWeight: "300",
                        marginBottom: "1vh"
                    }}>
                        asdfasdf
                    </p>

                    {
                        testType === "likert" ? 
                        <fieldset className='likert-container'>

                            <label htmlFor="radio-1">
                                <div className='radio-item' >
                                <input type="radio"
                                value={"1"}
                                name='likert'
                                id='radio-1'
                                onClick={radioHandler}/>
                                    <p className='radio-value'>
                                        A is much better
                                    </p>
                                </div>
                            </label>


                            <label htmlFor="radio-2">
                                <div className='radio-item'>
                                    <input type="radio"
                                    value={"2"}
                                    name='likert'
                                    id='radio-2'
                                    onClick={radioHandler} 
                                    
                                    style={{
                                        border: "1px solid black"
                                    }}/>
                                    <p className='radio-value'>
                                        A is better
                                    </p>
                                </div>
                            </label>

                            <label htmlFor="radio-3">
                                <div className='radio-item'>
                                    <input type="radio"
                                    value={"3"}
                                    name='likert'
                                    id='radio-3'
                                    onClick={radioHandler} 
                                    />
                                    <p className='radio-value'>
                                        About the same
                                    </p>
                                </div>
                            </label>


                            <label htmlFor="radio-4">
                                <div className='radio-item'>
                                    <input type="radio"
                                    value={"4"}
                                    name='likert'
                                    id='radio-4'
                                    onClick={radioHandler} />
                                    <p className='radio-value'>
                                        B is  better
                                    </p>
                                </div>
                            </label>


                            <label htmlFor="radio-5">
                                <div className='radio-item'>
                                    <input type="radio"
                                    value={"5"}
                                    name='likert'
                                    id='radio-5'
                                    onClick={radioHandler} />

                                    <p className='radio-value'>
                                        B is much better

                                    </p>
                                </div>
                            </label>
                        </fieldset> 

                        : 
                        null
                    }
                        


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