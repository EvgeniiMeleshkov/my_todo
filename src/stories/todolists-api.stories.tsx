import React, {useEffect, useState} from 'react'
import {todoApi} from '../api/todo-api';

export default {
    title: 'TODO_API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoApi.getTodos()
            .then(res => setState(res.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoApi.createTodo('Some todo')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoApi.deleteTodo("00ef19ec-acc4-47c2-bf48-8ae70ff53c5d")
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoApi.updateTodo({id: "3d8d1d11-a1ff-4cd1-9d18-b0ef4a5b2e22",title: 'BlahBlah'})
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

