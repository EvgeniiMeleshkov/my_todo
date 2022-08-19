import React, {useCallback, useState} from 'react';
import './App.css';
import {ButtonAppBar} from './components/header/ButtonAppBar';
import {Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider} from '@mui/material';
import {addTodoAC, ToDoType} from './reducers/todoReducer';
import {green, yellow} from '@mui/material/colors';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from './redux/store';
import {ToDoList} from './components/body/ToDoList';
import {AddItemForm} from './components/AddItemForm/AddItemForm';


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
    const toggle = useCallback( () => {
        setAppearance(appearance => !appearance)
    }, [])
    const theme = createTheme({
        palette: {
            primary: appearance ? green : yellow,
            mode: appearance ? 'light' : 'dark'
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <ButtonAppBar appearance={appearance} toggle={toggle} addTodo={addTodo}/>
                <Container fixed>
                    <div style={{display: 'flex',
                        alignItems: 'baseline'}}>
                        <p style={{width: '30vw'}}>
                            <button style={{
                                fontSize: '30px',
                                marginRight: '2rem',
                                border: 'none',
                                backgroundColor: 'transparent'}} onClick={toggle}>{appearance ? '🌙' : '☀️'}</button>
                            {'Add todo?...'}</p>
                        <AddItemForm calBack={addTodo}/>
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
