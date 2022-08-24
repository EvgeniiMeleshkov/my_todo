import {v1} from 'uuid';
import {addTodoACType} from './todoReducer';
import {TaskItemType, TaskPriorities, TasksFromServerType, TaskStatuses} from '../api/tasks-api';


// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

export type ToDoListStateType = {
    [key: string]: TaskItemType[]
}



const initialStateTasks = {} as ToDoListStateType

export const TasksReducer = (state: ToDoListStateType = initialStateTasks, action: ActionsTaskTypes): ToDoListStateType => {
    switch (action.type) {
        case 'ADD_TASK':
            const newTask = {
                //FIX=================//
            id: action.payload.id,
            title: action.payload.title,
                todoListId: action.payload.todoListId,
                order: action.payload.order,
                status: action.payload.status,
                priority: action.payload.priority,
                addedDate: action.payload.addedDate,
                description: action.payload.description,
                startDate: action.payload.startDate,
                deadline: action.payload.deadline
        }
            return {...state, [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]}
        case 'CHANGE_TASK_TITLE':
            return {...state, [action.payload.todoID]: state[action.payload.todoID].map(el => {
                    return el.id === action.payload.taskID ? {...el, title: action.payload.title} : el
                })}
        case 'TOGGLE_IS_DONE':
            return {...state, [action.payload.todoID]: state[action.payload.todoID].map(el => {
                    return el.id === action.payload.taskId ? {...el, status: action.payload.status} : el
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
            title,
            id: v1(),
            todoListId: todoID,
            order: 1,
            status: TaskStatuses.New,
            priority: TaskPriorities.Hi,
            addedDate: Date.toString(),
            description: '',
            startDate: '',
            deadline: ''
        }
    } as const
}
export const deleteTasksThenTodoDeletedAC = (todoID: string) => {
    return {
        type: 'DELETE_TASKS_THEN_TODO_DELETED',
        payload: {
            todoID
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
            todoID,
            taskId
        }
    } as const
}
export const toggleIsDoneAC = (todoID: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'TOGGLE_IS_DONE',
        payload: {
            todoID,
            taskId,
            status
        }
    } as const
}
export const changeTaskTitleAC = (todoID: string, taskID: string, title: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todoID,
            taskID,
            title
        }
    } as const
}