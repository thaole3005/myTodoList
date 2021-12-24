import {combineReducers, createStore, applyMiddleware} from 'redux';
import { TodoListReducer } from './reducers/TodoListReducer';
import reduxThunk from 'redux-thunk';

//middleware saga
import createMiddWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import { LoadingReducer } from './reducers/LoadingReducer';
const middleWareSaga = createMiddWareSaga();


const rootReducer = combineReducers({
    //nơi khai báo các state của ứng dụng
    TodoListReducer,
    LoadingReducer,
})


export const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));


//goij saga bằng hàm run, hàm run nhận vào rootsaga
middleWareSaga.run(rootSaga)
