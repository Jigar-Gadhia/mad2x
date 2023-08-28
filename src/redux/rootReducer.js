import { combineReducers } from "redux";
import { indreducer } from "./indReducer";
import { DashboardReducer } from "./DashboardReducer";

const rootReducer = combineReducers({
    ind: indreducer,
    result: DashboardReducer
})

export default rootReducer;