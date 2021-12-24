
import { GET_TASK_LIST } from './../constants/TodoListConst';

const initialState = {
    taskList: [],
}

export const TodoListReducer =(state = initialState, action) => {
    switch (action.type) {

        case GET_TASK_LIST: {
            state.taskList = action.taskList;
            return { ...state};
        }

        default: {
            
            return state
        }
    }
}



