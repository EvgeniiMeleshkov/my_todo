import {TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from 'redux';
import {AddTodolistActionType, RemoveTodolistActionType, setTodolistAC, setTodoStatusAC} from './todoReducer';
import {AppRootStateType} from '../redux/store';
import {setAppStatusAC, RequestStatusType} from './appReducer';
import {handleServerAppError, handleServerNetworkError} from '../utilites/errorUtils';
import axios from 'axios';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string
    task: TaskType
}

export type updateTaskActionType = {
    type: 'UPDATE_TASK',
    todolistId: string
    taskId: string
    task: TaskType
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type TasksActionsType = RemoveTaskActionType | AddTaskActionType
    | updateTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType | ReturnType<typeof setTodolistAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof setEntityStatusAC>

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.todolistId];
            // const newTasks = tasks.filter(t => t.id !== action.taskId);
            // stateCopy[action.todolistId] = newTasks;
            return {...state, [action.todolistId]: [...state[action.todolistId].filter(el => el.id !== action.taskId)]};

        }
        case 'SET_ENTITY_TASK_STATUS':
            return {...state, [action.todoID]: [...state[action.todoID].map(el => el.id === action.taskID ? {...el, entityStatus: action.status} : el)]}
        case 'ADD-TASK': {
            return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]}
        }
        case 'UPDATE_TASK': {
            // let todolistTasks = state[action.todolistId];
            // let newTasksArray = todolistTasks
            //     .map(t => t.id === action.taskId ? {...t, ...action.model} : t);
            //
            // state[action.todolistId] = newTasksArray;
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {...action.task} : el)
            };
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todo.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET_TODOLISTS':
            const copy = {...state}
            action.todolists.forEach((el) => {
                copy[el.id] = []
            })
            return copy
        case 'SET_TASKS':
            return {...state, [action.todolistId]: action.tasks}

        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', task, todolistId}
}
export const setEntityStatusAC = (todoID: string, taskID: string, status: RequestStatusType) => {
    return {type: 'SET_ENTITY_TASK_STATUS', todoID, taskID, status} as const
}
export const updateTaskAC = (taskId: string, task: TaskType, todolistId: string): updateTaskActionType => {
    return {type: 'UPDATE_TASK', task, todolistId, taskId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET_TASKS', todolistId, tasks} as const)

//======================= THUNKS ================================//


export const setTasksTC = (todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todoListID)
        .then(res => {
            dispatch(setTasksAC(todoListID, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        }).catch(error => handleServerNetworkError(error, dispatch))
}
export const deleteTaskTC = (taskID: string, todoListID: string) => async (dispatch: Dispatch) => {
    dispatch(setEntityStatusAC(todoListID, taskID, 'loading'))
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await todolistsAPI.deleteTask(todoListID, taskID)
        if (response.data.resultCode === 0) {
            dispatch(removeTaskAC(taskID, todoListID))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setEntityStatusAC(todoListID, taskID, 'succeeded'))
        } else {
            handleServerAppError(response.data, dispatch)
        }
    } catch (err) {
        if(axios.isAxiosError(err)){
            handleServerNetworkError(err, dispatch)
        }
    }

}

export const addTaskTC = (todoID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodoStatusAC(todoID, 'loading'))
    todolistsAPI.createTask(todoID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item, todoID))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setTodoStatusAC(todoID, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const updateTaskTC = (todoID: string, taskID: string, model: UpdateTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const task = getState().tasks[todoID].find(t => t.id === taskID)
        dispatch(setEntityStatusAC(task!.todoListId, taskID, 'loading'))
        //const mod = {...task, ...model}
        task &&
        todolistsAPI.updateTask(todoID, taskID, {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            startDate: task.startDate,
            description: task.description,
            priority: task.priority,
            ...model
        })
            .then(res => {
                if(res.data.resultCode === 0){
                    dispatch(updateTaskAC(taskID, res.data.data.item, todoID))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(setEntityStatusAC(task!.todoListId, taskID, 'succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(setEntityStatusAC(task!.todoListId, taskID, 'failed'))
                }

            })
            .catch(error => handleServerNetworkError(error, dispatch))
    }