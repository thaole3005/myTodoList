import React, { Component } from 'react';
import './TodoList.css';
import { todoListService } from './../services/todoListService';
import Axios from 'axios';

class TodoListRCC extends Component {

    state = {
        taskList: [],
        values: {
            taskName: '',
        },
        errors: {
            taskName: ''
        }, 
        valid: true,
    }


    //getTaskList là hàm chạy đầu tiên khi load trang web lên => sẽ chạy ở componentDidMount
    getTaskList = () => {
        let promise = todoListService.getTaskListApi();
        // console.log("promise", promise);
        promise.then((response) => {
            let {data} = response;
            // console.log('taskList', data);
            this.setState({
                ...this.state,
                values: {
                    taskName: ''
                },
                taskList: data,
            }, () => {
                // console.log(this.state);
            })
        });
        promise.catch((error) => {
            console.log("error in getTaskList", error);
        })
    }


    renderTaskTodo = () => {
        return this.state.taskList.filter(task => !task.status).map((task, index) => {
            return  <li key = {index}>
                        <span>{task.taskName}</span>
                        <div className="buttons">
                            <button type = "button" className="remove" onClick = {() => {
                                this.deleteTask(task.taskName)
                            }}>
                            <i className="fa fa-trash-alt" />
                            </button>
                            <button className="complete" type = "button" onClick = {() => {
                                this.finishTask(task.taskName)
                            }}>
                            <i className="far fa-check-circle" />
                            <i className="fas fa-check-circle" />
                            </button>
                        </div>
                    </li>
        })
    }

    renderTaskTodoDone = () => {
        return this.state.taskList.filter(task => task.status).map((task, index) => {
            return   <li key={index}>
                        <span>{task.taskName}</span>
                        <div className="buttons">
                            <button type = "button" className="remove" onClick = {() => {
                                this.deleteTask(task.taskName)
                            }}>
                            <i className="fa fa-trash-alt" />
                            </button>
                            <button type = "button" className="complete" onClick = {() => {
                                this.rejectTask(task.taskName)
                            }}>
                            <i className="far fa-undo" />
                            <i className="fas fa-undo" />
                            </button>
                        </div>
                    </li>
        })
    }



    handleChange = (e) => {
        let {name, value} = e.target;
        // console.log(value);
        let newValues = {...this.state.values, [name]: value};

        //validation
        let regexString = /^[a-z A-Z]+$/;
        let errorMessage = "";
        if(value.trim() === '' || !regexString.test(value)) {
            errorMessage = `${name} is invalid`;
        }
        // console.log("errorMessage", errorMessage);
        let newErrors = {...this.state.errors, [name]: errorMessage};
        // console.log("newErrors", newErrors);
        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors,
        }, () => {
            this.checkValid();
        })  
    }


    checkValid = () => {
        // console.log("this.state.errors.taskName", this.state.errors.taskName);
        if(this.state.errors.taskName !== '') {
            // console.log("vào if");
            this.setState({
                ...this.state,
                valid: false,
            }, () => {
                // console.log("this.state sau khi checkValid", this.state);
            })
        } else {
            // console.log("vào else");
            this.setState({
                ...this.state,
                valid: true,
            }, () => {
                // console.log("this.state sau khi checkValid", this.state);
            })
        }
        
    }



    addTask = (e) => {
        e.preventDefault();
        if(!this.state.valid) {
            alert("taskName k hợp lệ, chỉ được chứa kí tự chữ");
            return;
        }
        let newTask = {
            taskName: this.state.values.taskName,
        }
        // console.log("newTask", newTask);
        let promise = todoListService.addTaskApi(newTask);
        promise.then((response) => {
            console.log("newTask", response.data);
            //thêm task mới thành công thì gọi lại hàm getTaskList để hiển thị task mới nhất
            this.getTaskList();
        })
        promise.catch((error) => {
            alert(error.response.data);
        });

    }


    deleteTask = (taskName) => {
        // console.log("taskName in deleteTask", taskName);
        let promise = todoListService.deletaskApi(taskName);
        promise.then((response) => {
            console.log("deletedTask", response.data);
            //delete task thành công thì gọi lại hàm getTaskList để hiển thị task mới nhất
            this.getTaskList();
        })
        promise.catch((error) => {
            alert(error.response.data);
        });
    }


    finishTask = (taskName) => {
        let promise = todoListService.finishTaskApi(taskName);
        promise.then((response) => {
            console.log("finishTask", response.data);
            //finish task thành công thì gọi lại hàm getTaskList để hiển thị task mới nhất
            this.getTaskList();
        })
        promise.catch((error) => {
            alert(error.response.data);
        });
    }


    rejectTask = (taskName) => {
        // console.log("taskName", taskName);
        let promise = todoListService.rejectTaskApi(taskName);
        promise.then((response) => {
            console.log("rejectTask", response.data);
            //reject task thành công thì gọi lại hàm getTaskList để hiển thị task mới nhất
            this.getTaskList();
        })
        promise.catch((error) => {
            alert(error.response.data);
        });

    }




    render() {
        return (
        <form onSubmit = {this.addTask}>
            <div>
            <div className="card">
                <div className="card__">
                <img src="./img/bgTodoList.png" />
                </div>
                {/* <h2>hello!</h2> */}
                <div className="card__body">
                <div className="card__content">
                    <div className="card__title">
                    <h2>My Tasks</h2>
                    <p>2021</p>
                    </div>
                    <div className="card__add">
                        <input name = "taskName" value = {this.state.values.taskName} id="newTask" onChange = {this.handleChange} type="text" placeholder="Enter an activity..." />
                        <button id="addItem" type = "button" onClick = {this.addTask}>
                            <i className="fa fa-plus" />
                        </button>

                    </div>
                    <p className="text-danger"> {this.state.errors.taskName}</p>
                    <div className="card__todo">
                    {/* Uncompleted tasks */}
                    <ul className="todo" id="todo">
                        {this.renderTaskTodo()}
                    
                    </ul>
                    {/* Completed tasks */}
                    <ul className="todo" id="completed">

                        {this.renderTaskTodoDone()}
                    
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </form>
           
        );
    }

    componentDidMount() {
        this.getTaskList();
    }


}

export default TodoListRCC;