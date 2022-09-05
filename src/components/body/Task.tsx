import React, {memo, useCallback} from 'react';
import {deleteTaskTC, updateTaskTC} from '../../reducers/tasksReducer';
import {SpanInput} from '../SpanInput/SpanInput';
import {Delete} from '@mui/icons-material';
import {IconButton, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {TaskStatuses} from '../../api/todolists-api';
import {useTypedDispatch} from '../../redux/store';
import {StatusType} from '../../reducers/appReducer';

type TasksPropsType = {
    taskID: string
    status: TaskStatuses
    taskTitle: string
    todoID: string
    entityTaskStatus: StatusType
}

export const Task = memo(({taskTitle, status, taskID, todoID, entityTaskStatus}: TasksPropsType) => {
    const dispatch = useTypedDispatch()

    const onIsDoneHandler = useCallback((e: SelectChangeEvent<TaskStatuses>) => {
        dispatch(updateTaskTC(todoID, taskID, {status: e.target.value as TaskStatuses}))
    }, [dispatch, todoID, taskID])

    const changeTaskTitle = useCallback((id: string, title: string) => {
        dispatch(updateTaskTC(id, taskID, {title}))
    }, [dispatch, taskID])

    const onDeleteTaskHandler = useCallback(() => {
        dispatch(deleteTaskTC(taskID, todoID))
    }, [dispatch, todoID, taskID])


    return (
        <li style={{
            display: 'grid',
            alignItems: 'center',
            gridAutoFlow: 'column',
            justifyContent: 'space-between',
        }}>
            <Select variant={'standard'} style={{color: 'inherit', fontSize: 'small', paddingLeft: '5px'}}
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
            <div style={{fontFamily: '-moz-initial'}}>
                <SpanInput fontSize={'medium'} title={taskTitle} todoID={todoID}
                           callBack={changeTaskTitle}/>
            </div>
            <IconButton disabled={entityTaskStatus === 'loading' || entityTaskStatus === 'failed'} color={'primary'} style={{color: 'inherit'}} onClick={onDeleteTaskHandler} size={'small'}>
                <Delete/>
            </IconButton>
        </li>
    );
})