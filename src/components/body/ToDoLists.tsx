import React from 'react';
import {FilterValueType, TaskType} from '../../App';
import {Button, ButtonGroup, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {SpanInput} from '../SpanInput/SpanInput';

type ToDoListsPropsType = {
    todoID: string
    title: string
    filter: FilterValueType
    tasks: TaskType[]
    toggleIsDone: (todoID: string, taskId: string, isDone: boolean) => void
    deleteTask: (todoID: string, taskId: string) => void
    addTask: (todoID: string, title: string) => void
    filterTasks: (todoID: string, filter: FilterValueType) => void
    deleteTodo: (todoID: string) => void
    changeTodoTitle: (todoID: string, title: string) => void
    changeTaskTitle: (todoID: string, taskID: string, title: string) => void
}
export const ToDoLists: React.FC<ToDoListsPropsType> = ({
                                                            todoID,
                                                            tasks,
                                                            title,
                                                            toggleIsDone,
                                                            deleteTask,
                                                            addTask,
                                                            filterTasks,
                                                            deleteTodo,
                                                            filter,
                                                            changeTodoTitle,
                                                            changeTaskTitle
                                                        }) => {

    const onIsDoneHandler = (taskId: string, isDone: boolean) => {
        toggleIsDone(todoID, taskId, !isDone)
    }
    const onDeleteTaskHandler = (taskID: string) => {
        deleteTask(todoID, taskID)
    }
    const onChangeFilter = (value: FilterValueType) => {
        filterTasks(todoID, value)
    }
    const onDeleteTodoHandler = () => {
        deleteTodo(todoID)
    }
    const mappedTasks = tasks.map(t => {
        return (
            <span key={t.id}>
                    <li style={{
                        display: 'grid',
                        alignItems: 'center',
                        gridAutoFlow: 'column',
                        justifyContent: 'space-between',
                    }}>
                        <Checkbox onClick={() => onIsDoneHandler(t.id, t.isDone)} checked={t.isDone}/>
                        <SpanInput title={t.title} todoID={todoID} callBack={(todoID, title)=>changeTaskTitle(todoID, t.id, title)}/>
                        <IconButton onClick={() => onDeleteTaskHandler(t.id)} size={'small'}>
                        <Delete/>
                    </IconButton>
                    </li>
            </span>
        )
    })
    return (
        <div style={{width: '220px', marginTop: '1rem'}}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                textAlign: 'center', fontWeight: 'bolder', fontSize: 'large'
            }}>
                <div>
                    <SpanInput title={title} todoID={todoID} callBack={changeTodoTitle}/>
                </div>
                <div>
                    <IconButton onClick={onDeleteTodoHandler} size={'large'}>
                        <Delete/>
                    </IconButton>
                </div>
            </div>
            <AddItemForm todoID={todoID} calBack={addTask}/>
            <ul style={{padding: '0'}}>
                {mappedTasks}
            </ul>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button size={'small'} variant={filter === 'All' ? 'contained' : 'outlined'} color={'warning'}
                            onClick={() => onChangeFilter('All')}>All</Button>
                    <Button size={'small'} variant={filter === 'Active' ? 'contained' : 'outlined'} color={'error'}
                            onClick={() => onChangeFilter('Active')}>Active</Button>
                    <Button size={'small'} variant={filter === 'Completed' ? 'contained' : 'outlined'} color={'success'}
                            onClick={() => onChangeFilter('Completed')}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}