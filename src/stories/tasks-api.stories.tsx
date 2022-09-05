import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolists-api';

export default {
    title: 'TASKS_API'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTasks("71b1efff-4284-4839-b2ae-77b94b543281")
            .then(res => setState(res.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTask("71b1efff-4284-4839-b2ae-77b94b543281", 'Task Task Task Task')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.deleteTask('71b1efff-4284-4839-b2ae-77b94b543281', "574d5db3-4b9d-4805-9476-33003d6f697f")
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.updateTask('71b1efff-4284-4839-b2ae-77b94b543281', "2e4d16a3-b51b-4d49-9dab-60acb2e41bf1",
            {title: 'adafd'}
        )
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

