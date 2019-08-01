import * as types from './../constants/ActionTypes'

var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((tasks, index) => {
        if (tasks.id === id) {
            result = index;
        }
    });
    return result;
}
//viết phương thức random string
var s4 = () => {
    //làm tròn
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
};
//tạo id
var randomID = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + s4() + '-' + s4() + s4() +
        s4() + '-' + s4() + s4() + s4();
};
var id;
var index = -1;
var data = JSON.parse(localStorage.getItem('tasks'))
//state mặc định array
var inittialState = data ? data : [];//ktra nếu có thì lấy data k thì trả về mảng rỗng
var myReducer = (state = inittialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status === true ? true : false
            }
            //2TH: add & edit
            if (!task.id) {
                task.id = randomID();
                    state.push(task);
            }else{
                index = findIndex(state, task.id);
                state[index]=task;
            }
            localStorage.setItem('tasks', JSON.stringify(state));//lưu ở local dạng string kp dạng object
            return [...state];//tránh trùng vùng nhớ, copy ra 1 array mới trả về
        case types.UPDATE_STATUS_TASK:
            id = action.id;
            index = findIndex(state, id);
            // state[index].status = !state[index].status; view k update
            //copy ra object mới
            //clone task mới = task cũ && status =!status
            //Xóa task cũ thêm task mới
            //  var cloneTask={...state[index]};
            //  cloneTask.status= !cloneTask.status;
            //  state[index]= cloneTask;
            state[index] = {
                ...state[index],
                status: !state[index].status
            }
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state];
        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state];
        default: return state;
    }
};
export default myReducer;
