import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolists-api';

export default {
    title: 'TASKS_API'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTasks("3d8d1d11-a1ff-4cd1-9d18-b0ef4a5b2e22")
            .then(res => setState(res.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTask("3d8d1d11-a1ff-4cd1-9d18-b0ef4a5b2e22", 'Task Task Task Task')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.deleteTask('3d8d1d11-a1ff-4cd1-9d18-b0ef4a5b2e22', "522bb91f-b4d9-4998-b0d5-9144a48ea8c5")
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.updateTask('3d8d1d11-a1ff-4cd1-9d18-b0ef4a5b2e22', "2e4d16a3-b51b-4d49-9dab-60acb2e41bf1",
            {title: 'adafd'}
        )
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

