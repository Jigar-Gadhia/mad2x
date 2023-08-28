import { dashboard } from "./constants";

const initialState = {
    result: [],
    error: false
}

export const DashboardReducer = (state = initialState, action) => {
    switch(action.type){
        case dashboard: 
            return {
                ...state,
                result: action.payload
            }
        default: 
        return state
    }
}