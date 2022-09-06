import React, {memo, useCallback, useEffect} from 'react';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {SpanInput} from '../SpanInput/SpanInput';
import {useSelector} from 'react-redux';
import {
    addTaskTC, setTasksTC, TasksStateType
} from '../../reducers/tasksReducer';
import {Task} from './Task';
import {Delete} from '@mui/icons-material';
import {Button, ButtonGroup, IconButton} from '@mui/material';
import {
    changeTodolistFilterAC, deleteTodoTC,
    FilterValuesType,
    TodolistDomainType, updateTodoTitleTC
} from '../../reducers/todoReducer';
import {AppRootStateType, useTypedDispatch} from '../../redux/store';
import {TaskStatuses} from '../../api/todolists-api';

type ToDoListsPropsType = TodolistDomainType

export const ToDoList = memo(({id, filter, title, entityStatus, order, addedDate}: ToDoListsPropsType) => {
    const isDisabled = entityStatus === 'loading' || entityStatus === 'failed'
    const dispatch = useTypedDispatch()
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    useEffect(()=>{
        dispatch(setTasksTC(id))
    },[dispatch, id])

//-------------------FILTER---------------------------
    const tasksForRender = filter === 'completed'
        ? tasks[id].filter(el => el.status === TaskStatuses.Completed)
        : filter === 'active'
            ? tasks[id].filter(el => el.status !== TaskStatuses.Completed)
            : tasks[id]

//----------------TODO_LOGIC-------------------------

    const onDeleteTodoHandler = useCallback(() => {
        dispatch(deleteTodoTC(id))
    }, [dispatch, id])

    const changeTodoTitle = useCallback((todoID: string, title: string) => {
        dispatch(updateTodoTitleTC(todoID, title))
    } ,[dispatch])

//-------------------TASKS_LOGIC-----------------------
    const addTask = useCallback(function (title: string) {
        dispatch(addTaskTC(id, title));
    }, [id, dispatch]);

    const onChangeFilter = useCallback( (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(id, filter))
    }, [dispatch, id])

    const mappedTasks = tasksForRender.map(t => {
        return (
            <Task key={t.id+id} entityTaskStatus={t.entityStatus} taskID={t.id} status={t.status} taskTitle={t.title} todoID={id}/>
        )
    })
//---------------------------------RENDER--------------------------------
    return (
        <div style={{width: '220px', marginTop: '1rem'}}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                textAlign: 'center', fontWeight: 'bolder', fontSize: 'large'
            }}>
                <div style={{fontFamily: 'monospace'}}>
                    <SpanInput fontSize={'20px'} title={title} todoID={id} callBack={changeTodoTitle}/>
                </div>
                <div>
                    <IconButton disabled={isDisabled} onClick={onDeleteTodoHandler} size={'medium'}>
                        <Delete/>
                    </IconButton>
                </div>
            </div>
            <AddItemForm disabled={isDisabled} calBack={addTask}/>
            <ul style={{padding: '0'}}>
                {mappedTasks}
            </ul>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button size={'small'} variant={filter === 'all' ? 'contained' : 'outlined'} color={'warning'}
                            onClick={() => onChangeFilter('all')}>All</Button>
                    <Button size={'small'} variant={filter === 'active' ? 'contained' : 'outlined'} color={'secondary'}
                            onClick={() => onChangeFilter('active')}>Active</Button>
                    <Button size={'small'} variant={filter === 'completed' ? 'contained' : 'outlined'} color={'info'}
                            onClick={() => onChangeFilter('completed')}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
})
