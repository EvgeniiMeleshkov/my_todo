import React, {memo, useCallback} from 'react';
import {Delete} from '@material-ui/icons';
import {useDispatch} from 'react-redux';
import {changeTaskTitleAC, deleteTaskAC, toggleIsDoneAC} from '../../reducers/tasksReducer';
import {SpanInput} from '../SpanInput/SpanInput';
import {Checkbox, IconButton} from '@material-ui/core';

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
                <Checkbox color={'primary'} onChange={onIsDoneHandler} checked={taskIsDone}/>

                <SpanInput title={taskTitle} todoID={todoID}
                           callBack={changeTaskTitle}/>

                <IconButton color={'primary'} onClick={onDeleteTaskHandler} size={'small'}>
                    <Delete/>
                </IconButton>
            </li>
    );
})