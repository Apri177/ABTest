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
        getState: (state, action) => {
            state.projects = action.payload
        }, 
        setState: (state, action) => {
            console.log(action.payload);
            state.projects = action.payload
        }
    }
})


export const {getState, setState}  = projectData.actions
export default projectData.reducer