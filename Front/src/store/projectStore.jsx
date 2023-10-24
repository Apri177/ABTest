import {createSlice} from "@reduxjs/toolkit"

export const initialState = {
    projects: [],
    preProject: {},
}

const projectData = createSlice({
    name: "project",
    initialState,
    reducers: {
        getProjectState: (state) => {
            return state.projects
        },
        setProjectState: (state, action) => {
            state.projects = action.payload
        },
        setPreProjectState: (state, action) => {
            // console.log(action.payload);
            state.preProject = action.payload
        },
        getPreProjectState : (state) => {
            return state.preProject
        },
    }
})


export const {getProjectState, setProjectState, setPreProjectState, getPreProjectState, setTests}  = projectData.actions
export default projectData.reducer