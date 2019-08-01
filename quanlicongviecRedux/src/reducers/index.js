import { combineReducers } from 'redux'
import tasks from './tasks'
import isDisplayForm from './isDisplayForm'
import itemEditing from './itemEditing'
import search from './search'

const myReducer = combineReducers({
    tasks,  //tasks: tasks
    isDisplayForm,
    itemEditing,
    search
})
export default myReducer;