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
        open: (state, action) => {
            state.popup.show = true
        },
        close: (state, action) => {
            state.popup.show = false
        }
    }
})

export const { open, close } = popupData.actions
export default popupData.reducer