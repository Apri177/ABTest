import { configureStore } from "@reduxjs/toolkit"
import projectData from "./projectStore"
import popupData from "./popupStore"

export default configureStore({
    reducer: {
        project: projectData,
        popup: popupData,
    },
})