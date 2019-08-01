import * as types from './../constants/ActionTypes'

//state mặc định
var inittialState = '';
var myReducer = (state = inittialState, action)=>{
    switch(action.type){
        case types.SEARCH_TASK:
            return action.keyword;
        default: return state;
    }
};
export default myReducer;
