// import {v1} from 'uuid';
// import {addTodoACType} from './todoReducer';
// import {taskApi, TaskItemType, TaskPriorities, TasksFromServerType, TaskStatuses} from '../api/tasks-api';
// import {Dispatch} from 'redux';
//
//
// // export type TaskType = {
// //     id: string
// //     title: string
// //     isDone: boolean
// // }
//
// export type ToDoListStateType = {
//     [key: string]: TaskItemType[]
// }
//
//
// const initialStateTasks = {} as ToDoListStateType
//
// export const TasksReducer = (state: ToDoListStateType = initialStateTasks, action: ActionsTaskTypes): ToDoListStateType => {
//     switch (action.type) {
//         case 'ADD_TASK':
//             return {...state, [action.payload.todoID]: [action.payload.task, ...state[action.payload.todoID]]}
//         case 'CHANGE_TASK_TITLE':
//             return {
//                 ...state, [action.payload.todoID]: state[action.payload.todoID].map(el => {
//                     return el.id === action.payload.taskID ? {...el, title: action.payload.title} : el
//                 })
//             }
//         case 'TOGGLE_IS_DONE':
//             return {
//                 ...state, [action.payload.todoID]: state[action.payload.todoID].map(el => {
//                     return el.id === action.payload.taskId ? {...el, status: action.payload.status} : el
//                 })
//             }
//         case 'DELETE_TASK':
//             return {
//                 ...state, [action.payload.todoID]: state[action.payload.todoID].filter(el => {
//                     return el.id !== action.payload.taskId
//                 })
//             }
//         case 'ADD_TODO':
//             return {...state, [action.payload.id]: []}
//         case 'DELETE_TASKS_THEN_TODO_DELETED':
//             const copyState = {...state}
//             delete copyState[action.payload.todoID]
//             return copyState
//         default:
//             return state
//     }
// }
//
// type addTaskACType = ReturnType<typeof addTaskAC>
// type deleteTaskACType = ReturnType<typeof deleteTaskAC>
// type toggleIsDoneACType = ReturnType<typeof toggleIsDoneAC>
// type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
//
// type deleteTasksThenTodoDeletedACType = ReturnType<typeof deleteTasksThenTodoDeletedAC>
//
// export type ActionsTaskTypes =
//     deleteTasksThenTodoDeletedACType
//     | addTodoACType
//     | addTaskACType
//     | deleteTaskACType
//     | toggleIsDoneACType
//     | changeTaskTitleACType
//
// export const addTaskAC = (todoID: string, task: TaskItemType) => {
//     return {
//         type: 'ADD_TASK',
//         payload: {
//             todoID,
//             task
//         }
//     } as const
// }
// export const deleteTasksThenTodoDeletedAC = (todoID: string) => {
//     return {
//         type: 'DELETE_TASKS_THEN_TODO_DELETED',
//         payload: {
//             todoID
//         }
//     } as const
// }
// // export const addEmptyTasksToNewTodoAC = (todoID: string) => {
// //     return {
// //         type: 'ADD_EMPTY_TASKS_TO_NEW_TODO',
// //         payload: {
// //             todoID: todoID
// //         }
// //     } as const
// // }
// export const deleteTaskAC = (todoID: string, taskId: string) => {
//     return {
//         type: 'DELETE_TASK',
//         payload: {
//             todoID,
//             taskId
//         }
//     } as const
// }
// export const toggleIsDoneAC = (todoID: string, taskId: string, status: TaskStatuses) => {
//     return {
//         type: 'TOGGLE_IS_DONE',
//         payload: {
//             todoID,
//             taskId,
//             status
//         }
//     } as const
// }
// export const changeTaskTitleAC = (todoID: string, taskID: string, title: string) => {
//     return {
//         type: 'CHANGE_TASK_TITLE',
//         payload: {
//             todoID,
//             taskID,
//             title
//         }
//     } as const
// }
//
// //========================= THUNK ======================//
//
// export const addTaskTC = (todoID: string, title: string) => (dispatch: Dispatch) => {
//     taskApi.createTask(todoID, title)
//         .then(res => dispatch(addTaskAC(todoID, res.data.data.item)))
// }

import {TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from 'redux';
import {AddTodolistActionType, RemoveTodolistActionType, setTodolistAC} from './todoReducer';
import {AppRootStateType} from '../redux/store';

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
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
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

export const updateTaskAC = (taskId: string, task: TaskType, todolistId: string): updateTaskActionType => {
    return {type: 'UPDATE_TASK', task, todolistId, taskId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET_TASKS', todolistId, tasks} as const)


export const setTasksTC = (todoListID: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todoListID)
        .then(res => dispatch(setTasksAC(todoListID, res.data.items)))
}
export const deleteTaskTC = (taskID: string, todoListID: string) => async (dispatch: Dispatch) => {
    try {
        const response = await todolistsAPI.deleteTask(todoListID, taskID)
        if (response.data.resultCode === 0) {
            dispatch(removeTaskAC(taskID, todoListID))
        }
    } catch (e) {
        console.log(e)
    } finally {

    }
}
// todolistsAPI.deleteTask(todoListID, taskID)
//     .catch(res => {
//         if(res.data.resultCode === 1) {
//             throw new Error(res.data.messages[0])
//         }
//     })
//     .then(res => dispatch(removeTaskAC(taskID, todoListID)))

export const addTaskTC = (todoID: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todoID, title)
        .then(res => dispatch(addTaskAC(res.data.data.item, todoID)))
}

export const updateTaskTC = (todoID: string, taskID: string, model: UpdateTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoID].find(t => t.id === taskID)
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
            .then(res => dispatch(updateTaskAC(taskID, res.data.data.item, todoID)))
    }