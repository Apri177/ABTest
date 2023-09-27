import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getState, setState } from "../../store/PopupState"


const Popup = () => {

    // reducer 작성하긴했는데 수정해야 함

    const dispatch = useDispatch()

    const { popup } = useSelector(state => state.popup)

    const setPopup = () => {
        dispatch(setState(popup))
    }

    const [ show, setShow ] = useState(false)

    const closeHandler = (e) => {
        setShow(false)
        popup.onClose(false)
    }

    useEffect(() => {
        setShow(show)
    }, [show])


    return(
        <div
        style={{
            visibility: show ? "visible" : "hidden",
            opacity: show ? "1" : "0"
        }} className="overlay">
            <div className="popup">
                <h2>Popup title</h2>
                <span className="close" onClick={closeHandler}>
                    asdfadsf
                </span>
                <div> ;lkjfdal;kfjdsa;ljk </div>
            </div>
        </div>
    )
}


export default Popup