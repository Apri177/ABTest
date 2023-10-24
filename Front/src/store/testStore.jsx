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
        testResult: Boolean,
        score: Number,
        testSel: String
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