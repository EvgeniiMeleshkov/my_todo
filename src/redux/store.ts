import {combineReducers, createStore} from 'redux';
import {TasksReducer} from '../reducers/tasksReducer';
import {TodoReducer} from '../reducers/todoReducer';

export const rootReducer = combineReducers({
    tasks: TasksReducer,
    todo: TodoReducer
})

export type AppStoreType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;
