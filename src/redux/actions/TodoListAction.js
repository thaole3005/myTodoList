import { todoListService } from "../../services/todoListService";
import { STATUS_CODE } from "../../util/settingSystem";
import { GET_TASK_API } from "../constants/TodoListConst";
import { GET_TASK_LIST } from './../constants/TodoListConst';

//* có 2 cách làm: Dùng promise rồi .then .catch hoặc dùng async hàm call back (dispatch) và await Axios(call api trả về 1 promise) để lấy đc response



export const getTaskListApiAction = () => {

       //!c1:
    // return dispatch => {
    //     let promise = todoListService.getTaskListApi();
    //     // console.log("promise", promise);
    //     promise.then((response) => {
    //         let {data} = response;
    //         // console.log('taskList data', data);
    //         //dispatch mảng taskList lấy đc từ server về lưu trên reduxStore
    //         dispatch({
    //             type: GET_TASK_LIS,
    //             taskList: data,
    //         })

            
    //     });
    //     promise.catch((error) => {
    //         console.log("error in getTaskList", error);
    //     })
    // }


    //!c2:
    return async dispatch => {
        try {
            let response = await todoListService.getTaskListApi();
        if(response.status === STATUS_CODE.SUCCESS) {

            console.log("taskList data", response.data);
            dispatch({
                         type: GET_TASK_LIST,
                         taskList: response.data,
             })
        }
        } catch (error) {
            console.log("error", error.resonse.data);
        }
   
    }
}



export const addTaskApiAction = (newTask) => {
    return async dispatch => {

        try {
        //xử lí trước khi dispatch
        // console.log("newTask", newTask);
        let {data, status} = await todoListService.addTaskApi(newTask);
        console.log("newTask", data);
        if(status === STATUS_CODE.SUCCESS) {
            //nếu thêm task thành công thì gọi lại action thunk để lấy taskList mới nhất hiển thị
            dispatch(getTaskListApiAction());
        }
    
       
        } catch (error) {
            console.log("error", error.resonse.data);
        }

       
    }
}


export const deleteTaskApiAction = (taskName) => {

    return dispatch => {
               // console.log("taskName in deleteTask", taskName);
               let promise = todoListService.deletaskApi(taskName);
               promise.then((response) => {
                   console.log("deletedTask", response.data);
                   //delete task thành công thì gọi lại hàm getTaskList để hiển thị task mới nhất
                   dispatch(getTaskListApiAction());
               })
               promise.catch((error) => {
                   alert(error.response.data);
               });
    }
}


export const finishTaskApiAction = (taskName) => {
    return dispatch => {
        let promise = todoListService.finishTaskApi(taskName);
        promise.then((response) => {
            console.log("finishTask", response.data);
            //finish task thành công thì gọi lại hàm getTaskList để hiển thị task mới nhất
            dispatch(getTaskListApiAction());

        })
        promise.catch((error) => {
            alert(error.response.data);
        });

    }
}



export const rejectTaskApiAction = (taskName) => {
    return dispatch => {
        let promise = todoListService.rejectTaskApi(taskName);
        promise.then((response) => {
            console.log("rejectTask", response.data);
            //reject task thành công thì gọi lại hàm getTaskList để hiển thị task mới nhất
            dispatch(getTaskListApiAction());
        })
        promise.catch((error) => {
            alert(error.response.data);
        });

    }
}
