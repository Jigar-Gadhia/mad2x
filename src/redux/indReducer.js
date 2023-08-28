import { index } from "./constants";

const initialState = {
    ind: ""
}

export const indreducer = (state = initialState, action) => {
    switch(action.type){
        case index :
            return {
                ...state,
                ind: action.payload
            }
        default: 
        return state
    }
}