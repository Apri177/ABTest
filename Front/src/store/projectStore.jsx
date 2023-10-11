import {createSlice} from "@reduxjs/toolkit"
import { getProjects } from "../util/api";
import { useDispatch } from "react-redux";

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
            state.preProject = action.payload
        },
    }
})


export const {getProjectState, setProjectState, setPreProjectState}  = projectData.actions
export default projectData.reducer