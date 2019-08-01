import * as types from './../constants/ActionTypes'

//state mặc định, kiểu Object
var inittialState = {
    id:'',
    name:'',
    status:false
};
var myReducer = (state = inittialState, action)=>{
    switch(action.type){
        case types.EDIT_TASK:
            return action.task;
        default: return state;
    }
};
export default myReducer;
