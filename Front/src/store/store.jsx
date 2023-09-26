import { configureStore } from "@reduxjs/toolkit"
import projectData from "./index"


export default configureStore({
    reducer: {
        project: projectData,
    },
})