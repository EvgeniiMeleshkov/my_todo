import React, {memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {changeTaskTitleAC, deleteTaskTC, updateTaskTC} from '../../reducers/tasksReducer';
import {SpanInput} from '../SpanInput/SpanInput';
import {Delete} from '@mui/icons-material';
import {IconButton, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {TaskStatuses} from '../../api/todolists-api';

type TasksPropsType = {
    taskID: string
    status: TaskStatuses
    taskTitle: string
    todoID: string
}

export const Task = memo(({taskTitle, status, taskID, todoID}: TasksPropsType) => {
    const dispatch = useDispatch()

    const onIsDoneHandler = useCallback((e: SelectChangeEvent<TaskStatuses>) => {
        //@ts-ignore
        dispatch(updateTaskTC(todoID, taskID, {status: e.target.value}))
    }, [dispatch, todoID, taskID])

    const changeTaskTitle = useCallback((id: string, title: string) => {
        //@ts-ignore
        dispatch(updateTaskTC(id, taskID, {title}))
    }, [dispatch, taskID])

    const onDeleteTaskHandler = useCallback(() => {
        //@ts-ignore
        dispatch(deleteTaskTC(taskID, todoID))
    }, [dispatch, todoID, taskID])


    return (
            <li style={{
                display: 'grid',
                alignItems: 'center',
                gridAutoFlow: 'column',
                justifyContent: 'space-between',
            }}>
                <Select variant={'standard'} style={{color: 'inherit', fontSize: 'small'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Task status"
                    onChange={onIsDoneHandler}
                >
                    <MenuItem value={TaskStatuses.New}>New</MenuItem>
                    <MenuItem value={TaskStatuses.Completed}>Completed</MenuItem>
                    <MenuItem value={TaskStatuses.Draft}>Draft</MenuItem>
                    <MenuItem value={TaskStatuses.InProgress}>In propgress</MenuItem>
                </Select>

                <SpanInput title={taskTitle} todoID={todoID}
                           callBack={changeTaskTitle}/>

                <IconButton color={'primary'} style={{color: 'inherit'}} onClick={onDeleteTaskHandler} size={'small'}>
                    <Delete/>
                </IconButton>
            </li>
    );
})