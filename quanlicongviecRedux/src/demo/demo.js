//tìm hiểu về redux
//tạo store
import{createStore} from 'redux'

var initialState={
    status: false,
    sort:{
        by:'name',
        value: 1,//1 tanwng,-1 giảm
    }
}

//hàm để trả ra state mới
var myReducer =(state= initialState, action)=>{
    //phân tích hành động dựa vào type
    if(action.type === 'Toggle_Status'){
        //gọi state cũ
        state.status =! state.status;
        return state
    }
    if(action.type === 'Sort'){
        //để tránh TH trùng vùng nhớ default cũng thay đổi ta tạo mới
        var {by,value} = action.sort;//by=action.by- đã cập nhật
        var {status} =state;
        //cập nhật lại object
        // state.sort={
        //     by:action.sort.by,
        //     value: action.sort.value
        // }
        // return state

        return{
            status:status,
            sort:{
                by:by,
                value:value
            }
        }
    }
    return state
}

//tạo store hứng
const store = createStore(myReducer);
console.log('Default :',store.getState());
//thực hiện công việc thay đổi status
var action ={ type:'Toggle_Status'}
store.dispatch(action)
console.log('Toggle_Status :',store.getState());


//thực hiện công việc sắp xếp từ Z-A
var sortAction={
    type:'Sort',
    sort:{
        by:'name',
        value:-1
    }
}
store.dispatch(sortAction);
console.log('Sort: ',store.getState());