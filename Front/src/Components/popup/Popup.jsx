import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setState } from "../../store/popupStore"
import '../../styles/popup.scss'


const Popup = () => {

    // reducer 작성하긴했는데 수정해야 함

    const dispatch = useDispatch()

    const state = useSelector(state => state.popup)
    const closeHandler = () => {
        dispatch(setState())
    }

    useEffect(() => {
        console.log(state.popup.show);
    }, [state.popup.show])

    return(
        <div
        style={{
            // visibility: state.popup.show ? "visible" : "hidden", 
            visibility: "visible",
            opacity: 1
        }} className="overlay">
            <div className="popup">
                <div className="popup-title">
                    New Project
                </div>
                
                <div className="sec1">
                    <div className="insert-info">
                        admin code
                    </div>
                    <input className="popup-admin-code">

                    </input>
                </div>


                <div className="sec2">
                    <button onClick={closeHandler} className="popup-cancel">
                        cancel
                    </button>
                    <button className="popup-general">
                        NEXT
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Popup