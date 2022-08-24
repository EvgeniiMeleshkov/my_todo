import {FilterValueType} from '../App';
import {v1} from 'uuid';
import {TodolistType} from '../api/todo-api';

export type ToDoType = TodolistType & {
    filter: FilterValueType
}

const initialTodo = [] as ToDoType[]

export const TodoReducer = (state: ToDoType[] = initialTodo, action: ActionsTodoTypes): ToDoType[] => {
    switch (action.type) {
        case 'ADD_TODO':
            const newTodo: ToDoType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'All',
                addedDate: Date.toString(),
                order: 1
            }
            return [newTodo ,...state]
        case 'DELETE_TODO':
            return state.filter(el => el.id !== action.payload.todoID)
        case 'FILTERED_TODO':
            return state.map(el => el.id === action.payload.todoID ? {...el, filter: action.payload.filter} : el)
        case 'CHANGE_TODO_TITLE':
            return state.map(el => el.id === action.payload.todoID ? {...el, title: action.payload.title} : el)
        default:
            return state
    }
}
type filteredTodoACType = ReturnType<typeof filteredTodoAC>
export type addTodoACType = ReturnType<typeof addTodoAC>
type changeTodoTitleACType = ReturnType<typeof changeTodoTitleAC>
type deleteTodoACType = ReturnType<typeof deleteTodoAC>

type ActionsTodoTypes = deleteTodoACType| filteredTodoACType | addTodoACType | changeTodoTitleACType

export const filteredTodoAC = (todoID: string, filter: FilterValueType) => {
    return {
        type: 'FILTERED_TODO',
        payload: {
            todoID,
            filter
        }
    } as const
}
export const addTodoAC = (title: string) => {
    return {
        type: 'ADD_TODO',
        payload: {
            id: v1(),
            title
        }
    } as const
}
export const changeTodoTitleAC = (todoID: string, title: string) => {
    return {
        type: 'CHANGE_TODO_TITLE',
        payload: {
            todoID,
            title
        }
    } as const
}
export const deleteTodoAC = (todoID: string) => {
    return {
        type: "DELETE_TODO",
        payload: {
            todoID
        }
    } as const
}