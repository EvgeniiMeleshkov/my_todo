import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Add} from '@mui/icons-material';
import {Container, IconButton, TextField} from '@mui/material';

type AddItemFormPropsType = {
    calBack: (title: string) => void
    title?: string
}

export const AddItemForm = memo( ({calBack, title}: AddItemFormPropsType) => {
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
            calBack(value)
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
                    <Add/>
                </IconButton>
            </div>
        </Container>
    );
})

