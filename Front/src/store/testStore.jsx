import { createSlice } from "@reduxjs/toolkit"


export const initialState = {
    tests: [],
    preTest: {
        name : String,
        password : String,
        maxPart : String,
    }
}


const testData = createSlice({
    name: "test",
    initialState,
    reducers: {
        getTestState: (state) => {
            return state.tests
        },
        setTestState: (state, action) => {
            state.tests = action.payload
        },
    }
})

export const {getTestState, setTestState} = testData.actions
export default testData.reducer