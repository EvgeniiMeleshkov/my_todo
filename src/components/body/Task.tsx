import React, {memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {changeTaskTitleAC, deleteTaskAC, toggleIsDoneAC} from '../../reducers/tasksReducer';
import {SpanInput} from '../SpanInput/SpanInput';
import {Delete} from '@mui/icons-material';
import {IconButton, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {TaskStatuses} from '../../api/tasks-api';

type TasksPropsType = {
    taskID: string
    status: TaskStatuses
    taskTitle: string
    todoID: string
}

export const Task = memo(({taskTitle, status, taskID, todoID}: TasksPropsType) => {
    const dispatch = useDispatch()

    const onIsDoneHandler = useCallback((e: SelectChangeEvent<TaskStatuses>) => {
        dispatch(toggleIsDoneAC(todoID, taskID, e.target.value as TaskStatuses))
    }, [dispatch, todoID, taskID])

    const changeTaskTitle = useCallback((id: string, title: string) => {
        dispatch(changeTaskTitleAC(id, taskID, title))
    }, [dispatch, taskID])

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
                <Select variant={'standard'} style={{color: 'inherit'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Task status"
                    onChange={onIsDoneHandler}
                >
                    <MenuItem value={TaskStatuses.New}>New</MenuItem>
                    <MenuItem value={TaskStatuses.Complited}>Completed</MenuItem>
                    <MenuItem value={TaskStatuses.Draft}>Draft</MenuItem>
                    <MenuItem value={TaskStatuses.InPropgress}>In propgress</MenuItem>
                </Select>

                <SpanInput title={taskTitle} todoID={todoID}
                           callBack={changeTaskTitle}/>

                <IconButton color={'primary'} style={{color: 'inherit'}} onClick={onDeleteTaskHandler} size={'small'}>
                    <Delete/>
                </IconButton>
            </li>
    );
})