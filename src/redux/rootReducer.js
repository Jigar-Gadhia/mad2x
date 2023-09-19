import { combineReducers } from "redux";
import { indreducer } from "./indReducer";
import { DashboardReducer } from "./DashboardReducer";
import { ProfileReducer } from "./ProfileReducer";

const rootReducer = combineReducers({
    ind: indreducer,
    result: DashboardReducer,
    data: ProfileReducer
})

export default rootReducer;