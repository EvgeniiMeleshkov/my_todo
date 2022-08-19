import {v1} from 'uuid';
import {addTodoACType} from './todoReducer';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type ToDoListStateType = {
    [key: string]: TaskType[]
}



const initialStateTasks = {} as ToDoListStateType

export const TasksReducer = (state: ToDoListStateType = initialStateTasks, action: ActionsTaskTypes): ToDoListStateType => {
    switch (action.type) {
        case 'ADD_TASK':
            const newTask = {
            id: v1(),
            title: action.payload.title,
            isDone: false
        }
            return {...state, [action.payload.todoID]: [newTask, ...state[action.payload.todoID]]}
        case 'CHANGE_TASK_TITLE':
            return {...state, [action.payload.todoID]: state[action.payload.todoID].map(el => {
                    return el.id === action.payload.taskID ? {...el, title: action.payload.title} : el
                })}
        case 'TOGGLE_IS_DONE':
            return {...state, [action.payload.todoID]: state[action.payload.todoID].map(el => {
                    return el.id === action.payload.taskId ? {...el, isDone: action.payload.isDone} : el
                })}
        case 'DELETE_TASK':
            return {
                ...state, [action.payload.todoID]: state[action.payload.todoID].filter(el => {
                    return el.id !== action.payload.taskId
                })
            }
        case 'ADD_TODO':
            return {...state, [action.payload.id]: []}
        case 'DELETE_TASKS_THEN_TODO_DELETED':
            const copyState = {...state}
            delete copyState[action.payload.todoID]
            return copyState
        default:
            return state
    }
}

type addTaskACType = ReturnType<typeof addTaskAC>
type deleteTaskACType = ReturnType<typeof deleteTaskAC>
type toggleIsDoneACType = ReturnType<typeof toggleIsDoneAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type deleteTasksThenTodoDeletedACType = ReturnType<typeof deleteTasksThenTodoDeletedAC>

export type ActionsTaskTypes = deleteTasksThenTodoDeletedACType | addTodoACType | addTaskACType | deleteTaskACType | toggleIsDoneACType | changeTaskTitleACType

export const addTaskAC = (todoID: string, title: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todoID: todoID,
            title: title
        }
    } as const
}
export const deleteTasksThenTodoDeletedAC = (todoID: string) => {
    return {
        type: 'DELETE_TASKS_THEN_TODO_DELETED',
        payload: {
            todoID: todoID
        }
    } as const
}
// export const addEmptyTasksToNewTodoAC = (todoID: string) => {
//     return {
//         type: 'ADD_EMPTY_TASKS_TO_NEW_TODO',
//         payload: {
//             todoID: todoID
//         }
//     } as const
// }
export const deleteTaskAC = (todoID: string, taskId: string) => {
    return {
        type: 'DELETE_TASK',
        payload: {
            todoID: todoID,
            taskId: taskId
        }
    } as const
}
export const toggleIsDoneAC = (todoID: string, taskId: string, isDone: boolean) => {
    return {
        type: 'TOGGLE_IS_DONE',
        payload: {
            todoID: todoID,
            taskId: taskId,
            isDone: isDone
        }
    } as const
}
export const changeTaskTitleAC = (todoID: string, taskID: string, title: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todoID: todoID,
            taskID: taskID,
            title: title
        }
    } as const
}