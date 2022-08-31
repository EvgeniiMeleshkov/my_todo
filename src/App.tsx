import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {ButtonAppBar} from './components/header/ButtonAppBar';
import {useDispatch, useSelector} from 'react-redux';
import {ToDoList} from './components/body/ToDoList';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider} from '@material-ui/core';
import {green, yellow} from '@material-ui/core/colors';
import {AppRootStateType} from './redux/store';
import {createTodoTC, getTodosTC, TodolistDomainType} from './reducers/todoReducer';
import {todolistsAPI} from './api/todolists-api';
import {log} from 'util';



function App() {

    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const dispatch = useDispatch()
//-------------------------------------------------------------

    const addTodo = useCallback((title: string) => {
        //@ts-ignore
        dispatch(createTodoTC(title))
    }, [dispatch])


//-----------------------------------------------------------

    const [appearance, setAppearance] = useState(false)
    const toggle = useCallback(() => {
        setAppearance(appearance => !appearance)
    }, [])
    const theme = createTheme({
        palette: appearance ? {
            primary: {
                main: green[500],
            },
            secondary: {
                main: '#f4f136',
            },
            type: 'light'
        }
        : {
        primary: {
            main: yellow[500],
        },
        secondary: {
            main: '#117f8c',
        },
                type: 'dark'
    }
    });

    useEffect(()=>{
        todolistsAPI.me()
            .then(res => console.log(res));
        //@ts-ignore
        dispatch(getTodosTC)
    },[])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <ButtonAppBar/>
                <Container fixed>
                    <div style={{
                        display: 'flex',
                        alignItems: 'baseline'
                    }}>
                        <p style={{width: '30vw'}}>
                            <button style={{
                                fontSize: '30px',
                                marginRight: '2rem',
                                border: 'none',
                                backgroundColor: 'transparent'
                            }} onClick={toggle}>{appearance ? '🌙' : '☀️'}</button>
                            {'Add todo?...'}</p>
                            <AddItemForm calBack={addTodo}/>
                    </div>
                    <Grid container spacing={1}>
                        {
                            todoLists.map((t) => {
                                return (
                                    <Grid key={t.id} item style={{margin: '10px'}}>
                                        <Paper style={{backgroundColor: '#6495ed3b'}}>
                                            <ToDoList
                                                filter={t.filter}
                                                id={t.id}
                                                title={t.title}
                                                addedDate={t.addedDate}
                                                order={t.order}
                                            />
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
