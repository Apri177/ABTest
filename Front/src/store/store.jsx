import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import projectData from "./projectStore"
import popupData from "./popupStore"

export default configureStore({
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
    reducer: {
        project: projectData,
        popup: popupData,
    },
})