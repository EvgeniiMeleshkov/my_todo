import {FilterValueType, ToDoType} from '../App';

export const TodoReducer = (state: ToDoType[], action: ActionsTodoTypes):ToDoType[] => {
    switch (action.type) {
        case 'ADD_TODO':
            const newTodo: ToDoType = {
                todoID: action.payload.todoID,
                title: action.payload.title,
                filter: 'All'
            }
            return [newTodo ,...state]
        case 'DELETE_TODO':
            return state.filter(el => el.todoID !== action.payload.todoID)
        case 'FILTERED_TODO':
            return state.map(el => el.todoID === action.payload.todoID ? {...el, filter: action.payload.filter} : el)
        case 'CHANGE_TODO_TITLE':
            return state.map(el => el.todoID === action.payload.todoID ? {...el, title: action.payload.title} : el)
        default:
            return state
    }
}
type filteredTodoACType = ReturnType<typeof filteredTodoAC>
type addTodoACType = ReturnType<typeof addTodoAC>
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
export const addTodoAC = (todoID: string, title: string) => {
    return {
        type: 'ADD_TODO',
        payload: {
            todoID: todoID,
            title: title
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