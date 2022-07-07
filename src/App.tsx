import React, {useState} from 'react';
import './App.css';
import ButtonAppBar from './components/header/ButtonAppBar';
import {ToDoLists} from './components/body/ToDoLists';
import {v1} from 'uuid';
import {Container, Grid, Paper} from '@mui/material';

export type ToDoType = {
    todoID: string
    title: string
    filter: FilterValueType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type ToDoListStateType = {
    [key: string]: TaskType[]
}

export type FilterValueType = 'All' | 'Active' | 'Completed'

function App() {

    const todoID1 = v1()
    const todoID2 = v1()
    let filter:FilterValueType

    const [toDo, setTodo] = useState<ToDoType[]>([
        {todoID: todoID1, title: 'What to learn', filter: 'All'},
        {todoID: todoID2, title: 'What to buy', filter: 'All'}
    ])
    const [tasks, setTasks] = useState({
        [todoID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoID2]: [
            {id: v1(), title: 'milk', isDone: false},
            {id: v1(), title: 'Cola', isDone: false},
            {id: v1(), title: 'Cheese', isDone: false},
        ]
    })


    const toggleIsDone = (todoID: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks, [todoID]: tasks[todoID].map(el => {
                return el.id === taskId ? {...el, isDone} : el
            })
        })
    }
    const deleteTask = (todoID: string, taskId: string) => {
        setTasks({
            ...tasks, [todoID]: tasks[todoID].filter(el => {
                return el.id !== taskId
            })
        })
    }
    const addTask = (todoID: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoID]: [newTask, ...tasks[todoID]]})
    }
    const filterTasks = (todoID: string, filter: FilterValueType) => {
        setTodo(toDo.map(el => el.todoID === todoID ? {...el, filter} : el))
    }
    const addTodo = (todoID: string, title: string) => {
        const newTodo: ToDoType = {
            todoID: todoID,
            title: title,
            filter: 'All'
        }
        setTodo([newTodo ,...toDo])
        setTasks({...tasks, [newTodo.todoID]: []})
    }
    const deleteTodo = (todoID: string) => {
        setTodo(toDo.filter(el => el.todoID !== todoID))
        delete tasks[todoID]
        console.log(tasks)
    }
    const changeTodoTitle = (todoID: string, title: string) => {
        setTodo(toDo.map(el => el.todoID === todoID ? {...el, title} : el))
    }
    const changeTaskTitle = (todoID: string, taskID: string, title: string) => {
        setTasks({...tasks, [todoID]: tasks[todoID].map(el => {
            return el.id === taskID ? {...el, title} : el
            })})
    }
    const todoForRender = toDo.map(t => {
        const tasksForRender = t.filter === 'Completed'
            ? tasks[t.todoID].filter(el => el.isDone === true)
            : t.filter === 'Active'
                ? tasks[t.todoID].filter(el => el.isDone === false) : tasks[t.todoID]
        return (
            <Grid key={t.todoID} item style={{margin: '10px'}}>
                <Paper style={{backgroundColor: '#6495ed3b'}}>
                    <ToDoLists
                        filter={t.filter}
                        todoID={t.todoID}
                        deleteTask={deleteTask}
                        title={t.title}
                        tasks={tasksForRender}
                        toggleIsDone={toggleIsDone}
                        addTask={addTask}
                        filterTasks={filterTasks}
                        deleteTodo={deleteTodo}
                        changeTodoTitle={changeTodoTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className='App'>
            <ButtonAppBar addTodo={addTodo}/>
            <Container fixed>
                <Grid container spacing={1}>
                    {todoForRender}
                </Grid>
            </Container>

        </div>
    );
}

export default App;
