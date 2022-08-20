import React, {memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {changeTaskTitleAC, deleteTaskAC, toggleIsDoneAC} from '../../reducers/tasksReducer';
import {SpanInput} from '../SpanInput/SpanInput';
import {Delete} from '@mui/icons-material';
import {Checkbox, IconButton} from '@mui/material';

type TasksPropsType = {
    taskID: string
    taskIsDone: boolean
    taskTitle: string
    todoID: string
}

export const Task = memo(({taskTitle, taskIsDone, taskID, todoID}: TasksPropsType) => {
    const dispatch = useDispatch()

    const onIsDoneHandler = useCallback(() => {
        dispatch(toggleIsDoneAC(todoID, taskID, !taskIsDone))
    }, [dispatch, todoID, taskIsDone, taskID])

    const changeTaskTitle = useCallback((taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(todoID, taskID, title))
    }, [dispatch, todoID])

    const onDeleteTaskHandler = useCallback(() => {
        dispatch(deleteTaskAC(todoID, taskID))
    }, [dispatch, todoID, taskID])

    return (
            <li style={{
                display: 'grid',
                alignItems: 'center',
                gridAutoFlow: 'column',
                justifyContent: 'space-between',
            }}>
                <Checkbox color={'warning'} onChange={onIsDoneHandler} checked={taskIsDone}/>

                <SpanInput title={taskTitle} todoID={todoID}
                           callBack={changeTaskTitle}/>

                <IconButton color={'warning'} onClick={onDeleteTaskHandler} size={'small'}>
                    <Delete/>
                </IconButton>
            </li>
    );
})