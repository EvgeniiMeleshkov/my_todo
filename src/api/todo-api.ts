import axios, {AxiosResponse} from 'axios';


export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
//
// export type PostResponseType = {
// 	data: {
//         item: TodolistType;
//     };
// 	messages: string[];
// 	fieldsErrors: string[];
// 	resultCode: number;
// }


export type CommonResponseType<T = {}> = {
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
    data: T
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '61673f24-31ed-4acb-baab-8f77d72b4514'
    },
})


export const todoApi = {
    getTodos () {
        return instance.get<CommonResponseType>('todo-lists')
    },
    createTodo (title: string) {
        return  instance.post< '', AxiosResponse<CommonResponseType<{item: TodolistType}>>, {title: string}>('todo-lists',{title})
    },
    updateTodo (p: {id: string, title: string}) {
        return instance.put<CommonResponseType>(`todo-lists/${p.id}`, {title: p.title})
    },
    deleteTodo (id: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${id}`)
    }
}