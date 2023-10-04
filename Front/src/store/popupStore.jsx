import { createSlice } from "@reduxjs/toolkit"


// popup state 관리하는 reducer
// 수정 필요

export const initialState = {
    popup: {
        show: false,
    }
}

const popupData = createSlice({
    name: "popup",
    initialState,
    reducers: {
        getState: (state, action) => {
            return state
        },
        setState: (state, action) => {
            state.popup.show = !state.popup.show
        }
    }
})

export const { getState, setState } = popupData.actions
export default popupData.reducer