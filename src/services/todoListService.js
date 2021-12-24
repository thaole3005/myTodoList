
import { BaseService } from './baseService';


class TodoListService extends BaseService{

    getTaskListApi = () => {
        return this.get('GetAllTask');
    }

    addTaskApi = (newTask) => {
        return this.post('AddTask', newTask);
    }


    deletaskApi = (taskName) => {
        return this.delete(`deleteTask?taskName=${taskName}`);
    }

    finishTaskApi = (taskName) => {
        return this.put(`doneTask?taskName=${taskName}`);
    }

    rejectTaskApi = (taskName) => {
        console.log("rejectTaskApi", taskName);
        return this.put(`rejectTask?taskName=${taskName}`);
    }
}


export const todoListService = new TodoListService();