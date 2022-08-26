
// export type PostResponseType = {
// 	data: {
//         item: TodolistType;
//     };
// 	messages: string[];
// 	fieldsErrors: string[];
// 	resultCode: number;
// }
import axios from 'axios';

export enum TaskStatuses {
    New = 0,
    InPropgress = 1,
    Complited = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TasksFromServerType = {
    items: TaskItemType[];
    totalCount: number;
    error: null | string
}
export type TaskItemType = {
    id: string
    title: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    addedDate: string
    description: string | null
    startDate: string | null
    deadline: string | null

}
//
export type CommonResponseTasksType<T = {}> = {
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
    data: T
}

export type TaskUpdateType = {
    title: string
    description: string | null
    completed: boolean
    status: number
    priority: number
    startDate: Date | null
    deadline: Date | null
}

export const task = {
    title: 'GGGG',
    description: null,
    completed: false,
    status: 0,
    priority: 1,
    startDate: null,
    deadline: null
}

export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '61673f24-31ed-4acb-baab-8f77d72b4514'
    },
})


export const taskApi = {
    getTasks(todoID: string) {
        return instance.get<CommonResponseTasksType>(`todo-lists/${todoID}/tasks`)
    },
    createTask(todoID: string, title: string) {
        return instance.post(`todo-lists/${todoID}/tasks`, {title})
    },
    updateTask(p: { todoID: string, taskID: string, task: TaskUpdateType }) {
        return instance.put(`todo-lists/${p.todoID}/tasks/${p.taskID}`, task)
    },
    deleteTask(todoID: string, taskID: string) {
        return instance.delete(`todo-lists/${todoID}/tasks/${taskID}`)
    }
}