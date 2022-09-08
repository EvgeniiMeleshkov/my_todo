// import {FilterValueType} from '../App';
// import {v1} from 'uuid';
// import {TodolistType} from '../api/todo-api';
//
// export type ToDoType = TodolistType & {
//     filter: FilterValueType
// }
//
// const initialTodo = [] as ToDoType[]
//
// export const TodoReducer = (state: ToDoType[] = initialTodo, action: ActionsTodoTypes): ToDoType[] => {
//     switch (action.type) {
//         case 'ADD_TODO':
//             const newTodo: ToDoType = {
//                 id: action.payload.id,
//                 title: action.payload.title,
//                 filter: 'All',
//                 addedDate: Date.toString(),
//                 order: 1
//             }
//             return [newTodo ,...state]
//         case 'DELETE_TODO':
//             return state.filter(el => el.id !== action.payload.todoID)
//         case 'FILTERED_TODO':
//             return state.map(el => el.id === action.payload.todoID ? {...el, filter: action.payload.filter} : el)
//         case 'CHANGE_TODO_TITLE':
//             return state.map(el => el.id === action.payload.todoID ? {...el, title: action.payload.title} : el)
//         default:
//             return state
//     }
// }
// type filteredTodoACType = ReturnType<typeof filteredTodoAC>
// export type addTodoACType = ReturnType<typeof addTodoAC>
// type changeTodoTitleACType = ReturnType<typeof changeTodoTitleAC>
// type deleteTodoACType = ReturnType<typeof deleteTodoAC>
//
// type ActionsTodoTypes = deleteTodoACType| filteredTodoACType | addTodoACType | changeTodoTitleACType
//
// export const filteredTodoAC = (todoID: string, filter: FilterValueType) => {
//     return {
//         type: 'FILTERED_TODO',
//         payload: {
//             todoID,
//             filter
//         }
//     } as const
// }
// export const addTodoAC = (title: string) => {
//     return {
//         type: 'ADD_TODO',
//         payload: {
//             id: v1(),
//             title
//         }
//     } as const
// }
// export const changeTodoTitleAC = (todoID: string, title: string) => {
//     return {
//         type: 'CHANGE_TODO_TITLE',
//         payload: {
//             todoID,
//             title
//         }
//     } as const
// }
// export const deleteTodoAC = (todoID: string) => {
//     return {
//         type: "DELETE_TODO",
//         payload: {
//             todoID
//         }
//     } as const
// }

import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from 'redux';
import {handleServerAppError, handleServerNetworkError} from '../utilites/errorUtils';
import {RequestStatusType, setAppStatusAC} from './appReducer';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todo: TodolistDomainType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
export type SetEntityStatusACType = ReturnType<typeof setTodoStatusAC>
export type TodosActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType | ReturnType<typeof setTodolistAC> | SetEntityStatusACType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodosActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [action.todo, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'SET_TODOLISTS':
            return action.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        case 'SET_TODO_STATUS':
            return state.map(el => el.id === action.todoID ? {...el, entityStatus: action.status} : el)
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todo: TodolistDomainType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todo}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET_TODOLISTS',
        todolists
    } as const
}
export const setTodoStatusAC = (todoID: string, status: RequestStatusType) => {
    return {
        type: 'SET_TODO_STATUS',
        todoID,
        status
    } as const
}


//=============================== THUNK ===================

export const getTodosTC = (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        }).catch(err => handleServerNetworkError(err, dispatch))
}

export const createTodoTC = (title: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)

            }
        }).catch(err => handleServerNetworkError(err, dispatch))
}

export const deleteTodoTC = (todoID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodoStatusAC(todoID, 'loading'))
    todolistsAPI.deleteTodolist(todoID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todoID))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setTodoStatusAC(todoID, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(err => handleServerNetworkError(err, dispatch))
}

export const updateTodoTitleTC = (todoID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTodolist(todoID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todoID, title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(err => handleServerNetworkError(err, dispatch))
}

