import { useDispatch, useSelector } from 'react-redux';
import '../../styles/button.scss'
import { open } from '../../store/popupStore';
import { createProject } from '../../util/api';

const CreateButton = ({ content }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => state.popup)

    const touch = () => {
        if(!state.popup.show) {
            dispatch(open())
        }
    }

    return (
        <button className="create-button" onClick={touch} >
            <img src={`/images/button-icon-add.svg`} alt="plsus" />
            <p>
                {content}
            </p>
        </button>
    );
};


export default CreateButton