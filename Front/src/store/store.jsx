import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import projectData from "./projectStore"
import popupData from "./popupStore"
import testData from "./testStore"

export default configureStore({
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
    reducer: {
        project: projectData,
        popup: popupData,
        test: testData,
    },
})