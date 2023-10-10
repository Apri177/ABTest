import {createSlice} from "@reduxjs/toolkit"

export const initialState = {
    projects: [
        {
            id: 0,
            name: "",
            content: "",
            adminCode: "",
            updateDate: "",
        },
    ],
}

const projectData = createSlice({
    name: "project",
    initialState,
    reducers: {
        getProjectState: (state, action) => {
            console.log(state.projects);
        },

        setProjectState: (state, action) => {
            console.log(action);
            state.projects = action.payload
        },
        deleteProjectState: (state, action) => {
            console.log(action.payload);
            setProjectState()
        },
        initProjectState: (state, action) => {
            state.projects = initialState
        }
    }
})


export const {getProjectState, setProjectState}  = projectData.actions
export default projectData.reducer