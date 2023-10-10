import {createSlice} from "@reduxjs/toolkit"

export const initialState = {
    projects: [
        {
            id: 0,
            name: "",
            content: "",
            adminCode: "",
            updateDate: "",
        }
    ]
}

const projectData = createSlice({
    name: "project",
    initialState,
    reducers: {
        getProjectState: (state, action) => {
            state.projects = action.payload
        }, 
        setProjectState: (state, action, projects) => {
            state.projects = projects
        }
    }
})


export const {getProjectState, setProjectState}  = projectData.actions
export default projectData.reducer