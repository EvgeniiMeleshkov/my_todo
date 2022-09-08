import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {useSelector} from 'react-redux';
import {ToDoList} from './components/body/ToDoList';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {
    AppBar, Button, CircularProgress,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    LinearProgress,
    Paper,
    ThemeProvider, Toolbar
} from '@material-ui/core';
import {green, yellow} from '@material-ui/core/colors';
import {AppRootStateType, useTypedDispatch} from './redux/store';
import {createTodoTC, getTodosTC, TodolistDomainType} from './reducers/todoReducer';
import {ErrorSnackbar} from './components/errorSnackbar/ErrorSnackbar';
import {initializeAppTC, RequestStatusType} from './reducers/appReducer';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from './components/login/Login';
import {logOutTC} from './reducers/authReducer';
import {paths} from './paths/paths';


function App() {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const dispatch = useTypedDispatch()
//-------------------------------------------------------------

    const logOut = () => {
        dispatch(logOutTC())
    }

    const addTodo = useCallback((title: string) => {
        dispatch(createTodoTC(title))
    }, [dispatch])


//-----------------------------------------------------------
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const [appearance, setAppearance] = useState(false)
    const toggle = useCallback(() => {
        setAppearance(appearance => !appearance)
    }, [])
    const theme = createTheme({
        palette: appearance ? {primary: {main: green[500]}, secondary: {main: '#f4f136'}, type: 'light'}
            : {primary: {main: yellow[500]}, secondary: {main: '#117f8c'}, type: 'dark'}
    });

    useEffect(() => {
        dispatch(initializeAppTC())
        dispatch(getTodosTC)
    }, [])


    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <AppBar color={'inherit'} position="static">
                    <Toolbar>
                        {isLoggedIn
                            ? <Button onClick={logOut} color="inherit">Log out</Button>
                            : <Button color="inherit">Login</Button>}
                        {isLoggedIn && <AddItemForm calBack={addTodo}/>}
                        <button style={{
                            fontSize: '30px',
                            marginRight: '2rem',
                            border: 'none',
                            backgroundColor: 'transparent'
                        }} onClick={toggle}>{appearance ? '🌙' : '☀️'}</button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                {status === 'loading' && <LinearProgress color={'primary'}/>}
                {status === 'failed' && <LinearProgress style={{backgroundColor: 'crimson'}}/>}
                <ErrorSnackbar/>
                <Container fixed>
                    <Grid container spacing={1}>
                        <Routes>
                            <Route path={paths.main} element={todoLists.map((t) => {
                                return (<Grid key={t.id} item style={{margin: '10px'}}>
                                    <Paper style={{backgroundColor: '#6495ed3b'}}>
                                        <ToDoList
                                            entityStatus={t.entityStatus}
                                            filter={t.filter}
                                            id={t.id}
                                            title={t.title}
                                            addedDate={t.addedDate}
                                            order={t.order}
                                        /></Paper></Grid>)
                            })}/>
                            <Route path={paths.login} element={<Login/>}/>
                            <Route path={paths['404']} element={'404'}/>
                            <Route path="*" element={<Navigate to={'/404'}/>}/>
                        </Routes>


                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
