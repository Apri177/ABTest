import '../../styles/entertest.scss'


const Test = () => {
    return (
        <div className="ground">
            <div className='test-box'>
                <div className='sec1'>
                    <div className='prompt-box'>
                        insert something
                    </div>
                </div>
                <div className='sec2'>
                    <img src="/images/example_image1.svg" alt="고양이1" className='test-image'/>
                    <div style={{
                        width: "3vw"
                    }}>

                    </div>
                    <img src="/images/example_image2.svg" alt="고양이2" className='test-image'/>
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