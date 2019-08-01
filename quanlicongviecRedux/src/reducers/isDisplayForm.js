import * as types from './../constants/ActionTypes'

//state mặc định, kiểu boolean
var inittialState = false;//close form
var myReducer = (state = inittialState, action)=>{
    switch(action.type){
        case types.TOGGLE_FORM:
            return !state;
        case types.OPEN_FORM:
            return true;
        case types.CLOSE_FORM:
            //cập nhật lại state
            return false;
        default: return state;
    }
};
export default myReducer;
