import React from 'react';
import './TodoList.css';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { todoListService } from './../services/todoListService';



export default function TodoListRFC() {

    const [state, setState] = useState({
        taskList: [],
        values: {
            taskName: '',
        },
        errors: {
            taskName: ''
        },
        
    })
  
    const getTaskList = () => {
        let promise = todoListService.getTaskListApi();
        // console.log("promise", promise);
        promise.then((response) => {
            let {data} = response;
            // console.log('taskList', data);
            setState({
                ...state,
                values: {
                    taskName: ''
                },
                taskList: data,
            })
        });
        promise.catch((error) => {
            console.log("error in getTaskList", error);
        })
    }


    useEffect(() => {
        getTaskList();

        //!logic code trong khối lệnh return của ca;;back function dùng khi unmount 1 component nào đó
        return () => {

        }
    }, [])



    const renderTaskTodo = () => {
        return state.taskList.filter(task => !task.status).map((task, index) => {
            return  <li key = {index}>
                        <span>{task.taskName}</span>
                        <div className="buttons">
                            <button type = "button" className="remove" onClick = {() => {
                                deleteTask(task.taskName)
                            }}>
                            <i className="fa fa-trash-alt" />
                            </button>
                            <button className="complete" type = "button" onClick = {() => {
                                finishTask(task.taskName)
                            }}>
                            <i className="far fa-check-circle" />
                            <i className="fas fa-check-circle" />
                            </button>
                        </div>
                    </li>
        })
    }

    const renderTaskTodoDone = () => {
        return state.taskList.filter(task => task.status).map((task, index) => {
            return   <li key={index}>
                        <span>{task.taskName}</span>
                        <div className="buttons">
                            <button type = "button" className="remove" onClick = {() => {
                                deleteTask(task.taskName)
                            }}>
                            <i className="fa fa-trash-alt" />
                            </button>
                            <button type = "button" className="complete" onClick = {() => {
                                rejectTask(task.taskName)
                            }}>
                            <i className="far fa-undo" />
                            <i className="fas fa-undo" />
                            </button>
                        </div>
                    </li>
        })
    }






    const handleChange = (e) => {
        let {name, value} = e.target;
        // console.log("value", value);

        let newValues = {...state.values};
        newValues[name] = value;

        let newErrors = {...state.errors};
        let regexString = /^[a-z A-Z]+$/;

        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = name + ' invalid !';
        } else {
            newErrors[name] = '';
        }

        setState({
            ...state,
            values: newValues,
            errors: newErrors
        })

    }



    const addTask = (e) => {
        e.preventDefault();
        // console.log("state in addTask", state);
        if(state.errors.taskName !== '') {
            //nếu như ng dùng nhập sai định dạng thì k đc thêm
            alert("taskName k hợp lệ, chỉ được chứa kí tự chữ");
            return;
        }
        let newTask = {
            taskName: state.values.taskName,
        }
        console.log("newTask", newTask);
        let promise = todoListService.addTaskApi(newTask);
        promise.then((response) => {
            console.log("newTask", response.data);
            //thêm task mới thành công thì gọi lại hàm getTaskList để hiển thị task mới nhất
            getTaskList();
        })
        promise.catch((error) => {
            alert(error.response.data);
        });

    }


    const deleteTask = (taskName) => {
        // console.log("taskName in deleteTask", taskName);
        let promise = todoListService.deletaskApi(taskName);
        promise.then((response) => {
            console.log("deletedTask", response.data);
            //delete task thành công thì gọi lại hàm getTaskList để hiển thị task mới nhất
            getTaskList();
        })
        promise.catch((error) => {
            alert(error.response.data);
        });
    }


    const finishTask = (taskName) => {
        let promise = todoListService.finishTaskApi(taskName);
        promise.then((response) => {
            console.log("finishTask", response.data);
            //finish task thành công thì gọi lại hàm getTaskList để hiển thị task mới nhất
            getTaskList();
        })
        promise.catch((error) => {
            alert(error.response.data);
        });
    }


    const rejectTask = (taskName) => {
        // console.log("taskName", taskName);
        let promise = todoListService.rejectTaskApi(taskName);
        promise.then((response) => {
            console.log("rejectTask", response.data);
            //reject task thành công thì gọi lại hàm getTaskList để hiển thị task mới nhất
            getTaskList();
        })
        promise.catch((error) => {
            alert(error.response.data);
        });

    }



    return (
 
        <div className="card" onSubmit = {addTask}>
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
                    <input id="newTask" value = {state.values.taskName} name = "taskName" onChange = {handleChange} 
                     type="text" placeholder="Enter an activity..." />
                    <button id="addItem" type = "button" onClick = {addTask}>
                    <i className="fa fa-plus" />
                    </button>
                </div>
                <p className="text-danger"> {state.errors.taskName}</p>

                <div className="card__todo">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                    {renderTaskTodo()}    
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                {renderTaskTodoDone()}        
                </ul>
                </div>
            </div>
            </div>
        </div>

    )
}
