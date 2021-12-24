import React, {useState, useEffect} from 'react'
import { todoListService } from '../services/todoListService';
import { useSelector, useDispatch } from 'react-redux';
import { TodoListReducer } from '../redux/reducers/TodoListReducer';

import { addTaskApiAction, finishTaskApiAction, getTaskListApiAction, rejectTaskApiAction } from '../redux/actions/TodoListAction';
import { deleteTaskApiAction } from './../redux/actions/TodoListAction';

export default function TodoListRedux() {

    const dispatch = useDispatch();


    //laasy taskList từ redux xuống
    const {taskList} = useSelector(state => state.TodoListReducer);
    // console.log("taskList", taskList);

    const [state, setState] = useState({
        
        values: {
            taskName: '',
        },
        errors: {
            taskName: ''
        },
        
    })

    // console.log("state", state);
  
    const getTaskList = () => {
    
        dispatch(getTaskListApiAction())
    }

    useEffect(() => {
        getTaskList();

        //!logic code trong khối lệnh return của ca;;back function dùng khi unmount 1 component nào đó
        return () => {

        }
    }, [])



    const renderTaskTodo = () => {
        return taskList.filter(task => !task.status).map((task, index) => {
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
        return taskList.filter(task => task.status).map((task, index) => {
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

        //sau khi xử lí lấy dữ liệu ng dùng nhập => gọi action addTaskApi()
        dispatch(addTaskApiAction(newTask));

        //sau khi addTask thành công thì xóa nội dung ở input
        setState({
            ...state,
            values: {
                taskName: ''
            },
          
        });
    }


    const deleteTask = (taskName) => {
        dispatch(deleteTaskApiAction(taskName));
    }


    const finishTask = (taskName) => {
  
        dispatch(finishTaskApiAction(taskName));

    }


    const rejectTask = (taskName) => {
        // console.log("taskName", taskName);
       dispatch(rejectTaskApiAction(taskName));
    }



    return (
 
        <form className="card" onSubmit = {addTask}>
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
        </form>

    )
}
