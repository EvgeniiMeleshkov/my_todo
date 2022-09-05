// import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
// import {TasksReducer} from '../reducers/tasksReducer';
// import {TodoReducer} from '../reducers/todoReducer';
// import thunk from 'redux-thunk';
//
// export const rootReducer = combineReducers({
//     tasks: TasksReducer,
//     todo: TodoReducer
// })
//
// export type AppStoreType = ReturnType<typeof rootReducer>
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
//
// // @ts-ignore
// window.store = store;
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {TasksActionsType, tasksReducer} from '../reducers/tasksReducer';
import {todolistsReducer, TodosActionsType} from '../reducers/todoReducer';
import {useDispatch} from 'react-redux';
import {appReducer} from '../reducers/appReducer';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionType = TodosActionsType | TasksActionsType
//general dispatch type
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
