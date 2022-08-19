import React, {memo, useCallback} from 'react';
import {FilterValueType} from '../../App';
import {Button, ButtonGroup, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {SpanInput} from '../SpanInput/SpanInput';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from '../../redux/store';
import {addTaskAC,deleteTasksThenTodoDeletedAC,
    ToDoListStateType} from '../../reducers/tasksReducer';
import { changeTodoTitleAC, deleteTodoAC, filteredTodoAC, ToDoType} from '../../reducers/todoReducer';
import {Task} from './Task';

type ToDoListsPropsType = ToDoType

export const ToDoList = memo(({todoID, filter, title}: ToDoListsPropsType) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppStoreType, ToDoListStateType>(state => state.tasks)


//-------------------FILTER---------------------------
    const tasksForRender = filter === 'Completed'
        ? tasks[todoID].filter(el => el.isDone)
        : filter === 'Active'
            ? tasks[todoID].filter(el => !el.isDone)
            : tasks[todoID]

//----------------TODO_LOGIC-------------------------

    const onDeleteTodoHandler = useCallback(() => {
        dispatch(deleteTodoAC(todoID))
        dispatch(deleteTasksThenTodoDeletedAC(todoID))
    }, [dispatch, todoID])

    const changeTodoTitle = useCallback((todoID: string, title: string) => {
        dispatch(changeTodoTitleAC(todoID, title))
    } ,[dispatch])

//-------------------TASKS_LOGIC-----------------------
    const addTask = useCallback( (title: string) => {
        dispatch(addTaskAC(todoID, title))
    },[dispatch, todoID])

    const onChangeFilter = useCallback( (filter: FilterValueType) => {
        dispatch(filteredTodoAC(todoID, filter))
    }, [dispatch, todoID])

    const mappedTasks = tasksForRender.map(t => {
        return (
            <Task taskID={t.id} taskIsDone={t.isDone} taskTitle={t.title} todoID={todoID}/>
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
                    <SpanInput title={title} todoID={todoID} callBack={changeTodoTitle}/>
                </div>
                <div>
                    <IconButton onClick={onDeleteTodoHandler} size={'large'}>
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
                    <Button size={'small'} variant={filter === 'Active' ? 'contained' : 'outlined'} color={'error'}
                            onClick={() => onChangeFilter('Active')}>Active</Button>
                    <Button size={'small'} variant={filter === 'Completed' ? 'contained' : 'outlined'} color={'success'}
                            onClick={() => onChangeFilter('Completed')}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
})
