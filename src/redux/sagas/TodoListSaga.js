import {fork, take, takeEvery,delay, takeLatest,call, put } from 'redux-saga/effects';
import { STATUS_CODE } from '../../util/settingSystem';
import { ADD_TASK_SAGA, DELETE_TASK_SAGA, FINISH_TASK_SAGA, GET_TASK_LIST_SAGA, REJECT_TASK_SAGA } from '../constants/TodoListConst';
import { todoListService } from './../../services/todoListService';
import { GET_TASK_LIST } from './../constants/TodoListConst';
import { DISPLAY_LOADING, HIDE_LOADING } from './../constants/LoadingConst';


export function *getTaskListSaga(action) {

    yield put ({
        type: DISPLAY_LOADING,
    })

    //!code ở trên yield delay sẽ thực hiện và đợi 1s rồi mới đc thực hiện code ở bên dưới
    yield delay(1000);

    try {
        let {data, status} = yield call (() => todoListService.getTaskListApi());

        //nếu call api và lấy data (mảng taskList từ server thì dispatch lên reduxStore)
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_LIST,
                taskList: data,
            })
        }

    } catch (error) {
        console.log("error", error.response.data);
    }

    yield put ({
        type: HIDE_LOADING,
    })

}


export function *theoDoiGetTaskListSaga() {
    yield takeLatest(GET_TASK_LIST_SAGA, getTaskListSaga)
}




function * addTaskSaga(action) {
    
    try {
        let {newTask} = action;
        let {data, status} = yield call (() => todoListService.addTaskApi(newTask));

        //nếu call api và lấy data (mảng taskList từ server thì dispatch lên reduxStore)
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_LIST_SAGA,
            })
        }

    } catch (error) {
        console.log("error", error.response.data);
        
    }
}


export function * theoDoiAddTaskSaga() {
    yield takeLatest(ADD_TASK_SAGA, addTaskSaga);
}



function * deleteTaskSaga(action) {
    
    try {
        let {taskName} = action;
        let {data, status} = yield call (() => todoListService.deletaskApi(taskName));

        //nếu call api và lấy data (mảng taskList từ server thì dispatch lên reduxStore)
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_LIST_SAGA,
            })
        }

    } catch (error) {
        console.log("error", error.response.data);
        
    }
}


export function * theoDoiDeleteTaskSaga() {
    yield takeLatest(DELETE_TASK_SAGA, deleteTaskSaga);
}








function * finishTaskSaga(action) {
    
    try {
        let {taskName} = action;
        let {data, status} = yield call (() => todoListService.finishTaskApi(taskName));

        //nếu call api và lấy data (mảng taskList từ server thì dispatch lên reduxStore)
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_LIST_SAGA,
            })
        }

    } catch (error) {
        console.log("error", error.response.data);
        
    }
}


export function * theoDoiFinishTaskSaga() {
    yield takeLatest(FINISH_TASK_SAGA, finishTaskSaga);
}







function * rejectTaskSaga(action) {
    
    try {
        let {taskName} = action;
        let {data, status} = yield call (() => todoListService.rejectTaskApi(taskName));

        //nếu call api và lấy data (mảng taskList từ server thì dispatch lên reduxStore)
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_LIST_SAGA,
            })
        }

    } catch (error) {
        console.log("error", error.response.data);
        
    }
}


export function * theoDoiRejectTaskSaga() {
    yield takeLatest(REJECT_TASK_SAGA, rejectTaskSaga);
}