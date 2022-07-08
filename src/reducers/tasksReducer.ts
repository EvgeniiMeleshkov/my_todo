import {ToDoListStateType} from '../App';
import {v1} from 'uuid';

export const tasksReducer = (state: ToDoListStateType, action: ActionsTaskTypes) => {
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
        default:
            return state
    }
}

type addTaskACType = ReturnType<typeof addTaskAC>
type deleteTaskACType = ReturnType<typeof deleteTaskAC>
type toggleIsDoneACType = ReturnType<typeof toggleIsDoneAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export type ActionsTaskTypes = addTaskACType | deleteTaskACType | toggleIsDoneACType | changeTaskTitleACType

const addTaskAC = (todoID: string, title: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todoID: todoID,
            title: title
        }
    } as const
}

const deleteTaskAC = (todoID: string, taskId: string) => {
    return {
        type: 'DELETE_TASK',
        payload: {
            todoID: todoID,
            taskId: taskId
        }
    } as const
}
const toggleIsDoneAC = (todoID: string, taskId: string, isDone: boolean) => {
    return {
        type: 'TOGGLE_IS_DONE',
        payload: {
            todoID: todoID,
            taskId: taskId,
            isDone: isDone
        }
    } as const
}
const changeTaskTitleAC = (todoID: string, taskID: string, title: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todoID: todoID,
            taskID: taskID,
            title: title
        }
    } as const
}