import { createSlice } from "@reduxjs/toolkit"


// popup state 관리하는 reducer
// 수정 필요

export const initialState = {
    popup: {
        show: false,
        onClose: () => {}
    }
}

const popupData = createSlice({
    name: "popup",
    initialState,
    reducers: {
        getState: (state, action) => {
            state.popup = action.payload
        },
        setState: (state, action) => {
            console.log(action.payload);
            state.popup = action.payload
        }
    }
})

export const { getState, setState } = popupData.actions
export default popupData.reducer