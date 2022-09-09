import React, {useEffect} from 'react';
import { Grid, Paper} from '@material-ui/core';
import {Navigate} from 'react-router-dom';
import {paths} from '../../paths/paths';
import {ToDoList} from '../body/ToDoList';
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../../redux/store';
import {getTodosTC, TodolistDomainType} from '../../reducers/todoReducer';




const Todolists = () => {
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useTypedDispatch()

    useEffect(()=>{
        if(!isLoggedIn) {
            return
        }
        dispatch(getTodosTC)
    },[isLoggedIn])

    if(!isLoggedIn) {return <Navigate to={paths.login}/>}

    return (
            <Grid container spacing={1}>
               {todoLists.map((t) => {
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
                    })}
            </Grid>
    );
};

export default Todolists;