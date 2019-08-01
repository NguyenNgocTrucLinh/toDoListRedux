import React, { Component } from "react";
import "./App.css";
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import {findIndex} from 'lodash'
import {connect} from 'react-redux'
import * as actions from './actions/index' 
//import demo from './training/demo'
class App extends Component {

  constructor(props){
    super(props);
    //danh sách task
    this.state={
      sortBy:'name',
      sortValue:1
    }
  }


  //thêm
  onToggleForm = () => {
    var {itemEditing} = this.props;
    if(itemEditing && itemEditing.id !== ''){
        this.props.openForm();
    }else{
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id:'',
      name:'',
      status:false
    })
  }


  findIndex=(id)=>{
    var {tasks} = this.state;
    var result =-1;
    tasks.forEach((tasks,index)=>{
        if(tasks.id===id){
          result= index;
        }
    });
    return result;
  }

  onFilter=(filterName,filterStatus)=>{
    filterStatus=parseInt(filterStatus,10);
     //kt kiểu
    console.log(typeof filterStatus);
    this.setState({
      filter:{
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })

  }


  onSort=(sortBy,sortValue)=>{
    this.setState({
        sortBy: sortBy,
        sortValue: sortValue
    })
    console.log(this.state)
  }
  render() {
    var { filter,keyword, sortBy,sortValue} = this.state; //~ var tasks = this.state.tasks
    //tạo biến isDisplayForm lấy từ store
   
    var {isDisplayForm}= this.props;

    // if(filter){
    //   if(filter.name){
    //      //   đưa thư viện lodash vào
    //     tasks = filter(tasks,(task)=>{
    //       return task.name.toLowerCase().indexOf(keyword.toLocaleLowerCase()) !==-1;
    //     })
    //   }
      
    //   tasks= tasks.filter((tasks)=>{
    //     if(filter.status === -1){
    //       return tasks;
    //     } else{
    //       return tasks.status === (filter.status ===1 ? true : false)
    //     }
    //   })
    // }

    // if(sortBy ==='name'){
    //   tasks.sort((a,b)=>{
    //     if(a.name>b.name) return sortValue;
    //     else if (a.name <b.name) return -sortValue;
    //     else return 0;
    //   })
    // }else{
    //   tasks.sort((a,b)=>{
    //     if(a.status>b.status) return -sortValue;
    //     else if (a.status <b.status) return sortValue;
    //     else return 0;
    //   })
    //}
  
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' :''}>
          <TaskForm /> 
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' :'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button
             type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5" />
              Thêm Công Việc
            </button>&nbsp;
            
            <TaskControl 
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />
            <TaskList
             />
          </div>
        </div>
      </div>
    );
  }
}

//chuyển state từ store về props cho component
const mapStateToProps = (state)=>{
  return{
      isDisplayForm : state.isDisplayForm//state lấy từ reducer
  };
}

// thực thi hành động
const mapDispatchToProps = (dispatch,props)=>{
  return{
      onToggleForm : () =>{
          dispatch(actions.toggleForm());
      },
      onClearTask:(task)=>{
        dispatch(actions.editTask(task));
      },
      onOpenForm : () =>{
        dispatch(actions.openForm());
      },
    }

  };
export default connect(mapStateToProps,mapDispatchToProps)(App)