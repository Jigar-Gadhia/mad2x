import { profileFetch } from "./constants";

const initialState = {
    data: {},
    error: false
}

export const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case profileFetch:
            const newData = action.payload;
            const newError = newData === "" || newData === undefined;
            
            return {
                ...state,
                data: newData,
                error: newError
            };

        default:
            return state;
    }
}