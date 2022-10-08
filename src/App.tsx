import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {useSelector} from 'react-redux';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {
    AppBar, Button, CircularProgress,
    Container,
    createTheme,
    CssBaseline,
    LinearProgress,
    ThemeProvider, Toolbar
} from '@material-ui/core';
import {green, yellow} from '@material-ui/core/colors';
import {AppRootStateType, useTypedDispatch} from './redux/store';
import {createTodoTC} from './reducers/todoReducer';
import {ErrorSnackbar} from './components/errorSnackbar/ErrorSnackbar';
import {initializeAppTC, RequestStatusType} from './reducers/appReducer';
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import {logOutTC} from './reducers/authReducer';
import {paths} from './paths/paths';
import Todolists from './components/todolists/Todolists';
import {Login} from './components/login/Login';


function App() {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const [appearance, setAppearance] = useState(false)
    const dispatch = useTypedDispatch()
//-------------------------------------------------------------
    const toggle = useCallback(() => {
        setAppearance(appearance => !appearance)
    }, [])
    const theme = createTheme({
        palette: appearance ? {primary: {main: green[500]}, secondary: {main: '#f4f136'}, type: 'light'}
            : {primary: {main: yellow[500]}, secondary: {main: '#117f8c'}, type: 'dark'}
    });

    useEffect(() => {
        console.log("Initilazie")
        dispatch(initializeAppTC())
        return () => {
            console.log("Unmount!")
        }
    }, [])

    const logOut = () => {
        dispatch(logOutTC())
    }

    const addTodo = useCallback((title: string) => {
        dispatch(createTodoTC(title))
    }, [dispatch])


//-----------------------------------------------------------

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
//-------------------------------------------------------------
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <AppBar color={'inherit'} position="static">
                    <Toolbar>
                        {isLoggedIn
                            ? <Button onClick={logOut} color="inherit">Log out</Button>
                            : <NavLink style={{textDecoration: 'none', color: 'inherit'}} to={paths.login}><Button color="inherit">Login</Button></NavLink>}
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

                <Container fixed={true}>
                    <Routes>
                        <Route path={paths.main} element={<Todolists/>}/>
                        <Route path={paths.login} element={<Login/>}/>
                        <Route path={paths['404']} element={'404'}/>
                        <Route path={'*'} element={<Navigate to={paths['404']}/>}/>
                    </Routes>
                </Container>

            </div>
        </ThemeProvider>
    );
}

export default App;
