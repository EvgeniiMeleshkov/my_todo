import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Container, IconButton, TextField} from '@mui/material';

type AddItemFormPropsType = {
    calBack: (todoID: string, title: string) => void
    todoID: string
    title?: string
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({calBack, todoID, title}) => {
    const [error, setError] = useState(false)
    const [value, setValue] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value
        setValue(val)
        setError(false)
    }
    const onClickHandler = () => {
        if (value.trim() === '') {
            setError(true)
        } else {
            calBack(todoID, value)
            setValue('')
        }
    }
    const onEnterPressed = (event: KeyboardEvent<HTMLDivElement>) => {
        event.key === 'Enter' && onClickHandler()
    }
    return (
        <Container fixed>
            <div style={{paddingTop: '10px', display: 'flex', alignItems: 'center'}}>
                <TextField
                    onKeyDown={onEnterPressed}
                    label={error ? 'Type something' : 'Add item'}
                    error={error}
                    placeholder={title}
                    onChange={onChangeHandler}
                    value={value}
                    size={'small'}></TextField>
                <IconButton onClick={onClickHandler} size={'medium'} title={'Add task'}>
                    ➕
                </IconButton>
            </div>
        </Container>
    );
};


