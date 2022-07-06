import React, {ChangeEvent, useState} from 'react';
import {v1} from 'uuid';
import {FilterValueType, TaskType} from '../../App';
import {Button, ButtonGroup, Checkbox, Container, Grid, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {AddItemForm} from '../AddItemForm/AddItemForm';

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
                                                            filter
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
                        height: '30px',
                    }}>
                        <Checkbox onClick={() => onIsDoneHandler(t.id, t.isDone)} checked={t.isDone}/>
                        {t.title}
                        <IconButton onClick={() => onDeleteTaskHandler(t.id)} size={'small'}>
                        <Delete/>
                    </IconButton>
                    </li>
            </span>
        )
    })
    return (
        <div style={{width: '220px', marginTop: '1rem'}}>
            <div style={{textAlign: 'center', fontWeight: 'bolder', fontSize: 'large'}}>
                {title}
                <IconButton onClick={onDeleteTodoHandler} size={'large'}>
                    <Delete/>
                </IconButton>
            </div>
            <AddItemForm todoID={todoID} calBack={addTask}/>
            <ul style={{padding: '0'}}>
                {mappedTasks}
            </ul>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button size={'small'} variant={'outlined'} color={'warning'}
                            onClick={() => onChangeFilter('All')}>All</Button>
                    <Button size={'small'} variant={'outlined'} color={'error'}
                            onClick={() => onChangeFilter('Active')}>Active</Button>
                    <Button size={'small'} variant={'outlined'} color={'success'}
                            onClick={() => onChangeFilter('Completed')}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}