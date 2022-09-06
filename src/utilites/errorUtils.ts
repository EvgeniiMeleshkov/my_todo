import {setErrorAC, setStatusAC} from '../reducers/appReducer';
import {ResponseType} from '../api/todolists-api';
import {Dispatch} from 'redux';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if(data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Something went wrong'))
    }
    dispatch(setStatusAC('failed'))
}
export const handleServerNetworkError = (error: any, dispatch: Dispatch) => {
    dispatch(setErrorAC(error.message ? error.message : 'Something went wrong'))
    dispatch(setStatusAC('failed'))
}
