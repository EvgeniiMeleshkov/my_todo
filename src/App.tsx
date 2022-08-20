import React, {useCallback, useState} from 'react';
import './App.css';
import {ButtonAppBar} from './components/header/ButtonAppBar';
import {Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider, Typography} from '@material-ui/core';
import {addTodoAC, ToDoType} from './reducers/todoReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from './redux/store';
import {ToDoList} from './components/body/ToDoList';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {green, yellow} from '@material-ui/core/colors';


export type FilterValueType = 'All' | 'Active' | 'Completed'

function App() {

    const todoLists = useSelector<AppStoreType, ToDoType[]>(state => state.todo)
    const dispatch = useDispatch()
//-------------------------------------------------------------

    const addTodo = useCallback((title: string) => {
        dispatch(addTodoAC(title))
    }, [dispatch])


//-----------------------------------------------------------

    const [appearance, setAppearance] = useState(false)
    const toggle = useCallback(() => {
        setAppearance(appearance => !appearance)
    }, [])
    const theme = createTheme({
        palette: {
            primary: appearance ? green : yellow,
            type: appearance ? 'light' : 'dark'
        },
    });
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
                        <Typography >
                            <AddItemForm calBack={addTodo}/>
                        </Typography>

                    </div>
                    <Grid container spacing={1}>
                        {
                            todoLists.map((t) => {
                                return (
                                    <Grid key={t.todoID} item style={{margin: '10px'}}>
                                        <Paper style={{backgroundColor: '#6495ed3b'}}>
                                            <ToDoList
                                                filter={t.filter}
                                                todoID={t.todoID}
                                                title={t.title}
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
