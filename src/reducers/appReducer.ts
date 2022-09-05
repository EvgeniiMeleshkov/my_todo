export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = {
    status: StatusType
    error: string | null
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.payload.error}
        default:
            return {...state}
    }
}
type AppActionsType = SetErrorACType | SetStatusACType
type SetErrorACType = ReturnType<typeof setErrorAC>
type SetStatusACType = ReturnType<typeof setStatusAC>
export const setStatusAC = (status: StatusType) => {
    return {
        type: 'APP/SET_STATUS',
        payload: {
            status
        }
    } as const
}
export const setErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET_ERROR',
        payload: {
            error
        }
    } as const
}
