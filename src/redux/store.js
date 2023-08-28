import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import thunk from 'redux-thunk'

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk)
})

export default store;