import {currentDetails, dashboard} from './constants';

const initialState = {
  result: [],
  currentResult: {},
  error: false,
};

export const DashboardReducer = (state = initialState, action) => {
  console.log('action: ', action);
  switch (action.type) {
    case dashboard:
      return {
        ...state,
        result: action.payload,
      };
    case currentDetails:
      return {
        ...state,
        currentResult: action.payload,
      };
    default:
      return state;
  }
};
