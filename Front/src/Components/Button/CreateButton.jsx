import { useDispatch, useSelector } from 'react-redux';
import '../../styles/button.scss'
import { getState, setState } from '../../store/popupStore';

const CreateButton = ({ content }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => state.popup)

    const touch = () => {
        if(!state.popup.show) {
            dispatch(setState())
        }
    }

    return (
        <button className="create-button" onClick={touch}>
            <img src={`/images/button-icon-add.png`} alt="plsus" />
            <p>
                {content}
            </p>
        </button>
    );

};


export default CreateButton