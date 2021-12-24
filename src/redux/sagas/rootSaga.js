
import {fork, take, takeEvery,delay, takeLatest,call, put, all } from 'redux-saga/effects';
import * as TodoListSaga from './TodoListSaga';

export function * rootSaga() {

    //!yield all nhận vào mảng các generator function để theo dõi các actionSaga
   yield all([
    TodoListSaga.theoDoiGetTaskListSaga(),
    TodoListSaga.theoDoiAddTaskSaga(),
    TodoListSaga.theoDoiDeleteTaskSaga(),
    TodoListSaga.theoDoiFinishTaskSaga(),
    TodoListSaga.theoDoiRejectTaskSaga(),
   ])
}