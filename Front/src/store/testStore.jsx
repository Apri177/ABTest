import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    tests: [],
    preTest: {
        name : String,
        password : String,
        maxPart : String,
        file1 : String,
        file2 : String,
        numOfSets : Number,
        tester: Number,
        testResult: String,
        score: Number,
        testSel: String,
        p_value : Number,
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
        setPreTest: (state, action) => {
            state.preTest = action.payload
        }
    }
})

export const {getTestState, setTestState, setPreTest} = testData.actions
export default testData.reducer
