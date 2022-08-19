import React, {memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch} from 'react-redux';
import {changeTaskTitleAC, deleteTaskAC, toggleIsDoneAC} from '../../reducers/tasksReducer';
import {SpanInput} from '../SpanInput/SpanInput';

type TasksPropsType = {
    taskID: string
    taskIsDone: boolean
    taskTitle: string
    todoID: string
}

export const Task = memo(({taskTitle, taskIsDone, taskID, todoID}: TasksPropsType) => {
    const dispatch = useDispatch()

    const onIsDoneHandler = useCallback( (taskId: string, isDone: boolean) => {
        dispatch(toggleIsDoneAC(todoID, taskId, !isDone))
    }, [dispatch, todoID])

    const changeTaskTitle = useCallback( (taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(todoID, taskID, title))
    },[dispatch, todoID])

    const onDeleteTaskHandler = useCallback( (taskId: string) => {
        dispatch(deleteTaskAC(todoID, taskId))
    }, [dispatch, todoID])

    return (
        <span key={taskID}>
                    <li style={{
                        display: 'grid',
                        alignItems: 'center',
                        gridAutoFlow: 'column',
                        justifyContent: 'space-between',
                    }}>
                        <Checkbox onClick={() => onIsDoneHandler(taskID, taskIsDone)} checked={taskIsDone}/>
                        <SpanInput title={taskTitle} todoID={todoID}
                                   callBack={(todoID, title) => changeTaskTitle(taskID, title)}/>
                        <IconButton onClick={() => onDeleteTaskHandler(taskID)} size={'small'}>
                        <Delete/>
                    </IconButton>
                    </li>
            </span>
    );
})