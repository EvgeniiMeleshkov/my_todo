import React, {memo, useCallback} from 'react';
import {FilterValueType} from '../../App';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {SpanInput} from '../SpanInput/SpanInput';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../redux/store';
import {addTaskAC,deleteTasksThenTodoDeletedAC,
    ToDoListStateType} from '../../reducers/tasksReducer';
import { changeTodoTitleAC, deleteTodoAC, filteredTodoAC, ToDoType} from '../../reducers/todoReducer';
import {Task} from './Task';
import {Delete} from '@mui/icons-material';
import {Button, ButtonGroup, IconButton} from '@mui/material';
import {TaskStatuses} from '../../api/tasks-api';

type ToDoListsPropsType = ToDoType

export const ToDoList = memo(({id, filter, title}: ToDoListsPropsType) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppStoreType, ToDoListStateType>(state => state.tasks)


//-------------------FILTER---------------------------
    const tasksForRender = filter === 'Completed'
        ? tasks[id].filter(el => el.status === TaskStatuses.Complited)
        : filter === 'Active'
            ? tasks[id].filter(el => el.status !== TaskStatuses.Complited)
            : tasks[id]

//----------------TODO_LOGIC-------------------------

    const onDeleteTodoHandler = useCallback(() => {
        dispatch(deleteTodoAC(id))
        dispatch(deleteTasksThenTodoDeletedAC(id))
    }, [dispatch, id])

    const changeTodoTitle = useCallback((todoID: string, title: string) => {
        dispatch(changeTodoTitleAC(todoID, title))
    } ,[dispatch])

//-------------------TASKS_LOGIC-----------------------
    const addTask = useCallback( (title: string) => {
        dispatch(addTaskAC(id, title))
    },[dispatch, id])

    const onChangeFilter = useCallback( (filter: FilterValueType) => {
        dispatch(filteredTodoAC(id, filter))
    }, [dispatch, id])

    const mappedTasks = tasksForRender.map(t => {
        return (
            <Task key={t.id+id} taskID={t.id} status={t.status} taskTitle={t.title} todoID={id}/>
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
                <div>
                    <SpanInput title={title} todoID={id} callBack={changeTodoTitle}/>
                </div>
                <div>
                    <IconButton onClick={onDeleteTodoHandler} size={'medium'}>
                        <Delete/>
                    </IconButton>
                </div>
            </div>
            <AddItemForm calBack={addTask}/>
            <ul style={{padding: '0'}}>
                {mappedTasks}
            </ul>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button size={'small'} variant={filter === 'All' ? 'contained' : 'outlined'} color={'warning'}
                            onClick={() => onChangeFilter('All')}>All</Button>
                    <Button size={'small'} variant={filter === 'Active' ? 'contained' : 'outlined'} color={'secondary'}
                            onClick={() => onChangeFilter('Active')}>Active</Button>
                    <Button size={'small'} variant={filter === 'Completed' ? 'contained' : 'outlined'} color={'info'}
                            onClick={() => onChangeFilter('Completed')}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
})
