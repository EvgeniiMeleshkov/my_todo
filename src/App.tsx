import React, {useReducer, useState} from 'react';
import './App.css';
import {ButtonAppBar} from './components/header/ButtonAppBar';
import {ToDoLists} from './components/body/ToDoLists';
import {v1} from 'uuid';
import {Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider} from '@mui/material';
import {addTodoAC, changeTodoTitleAC, deleteTodoAC, filteredTodoAC, TodoReducer} from './reducers/todoReducer';
import {
    addEmptyTasksToNewTodoAC,
    addTaskAC, changeTaskTitleAC,
    deleteTaskAC,
    deleteTasksThenTodoDeletedAC,
    TasksReducer,
    toggleIsDoneAC
} from './reducers/tasksReducer';
import {green, yellow} from '@mui/material/colors';

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

    const [toDo, dispatchTodo] = useReducer(TodoReducer, [
        {todoID: todoID1, title: 'What to learn', filter: 'All'},
        {todoID: todoID2, title: 'What to buy', filter: 'All'}
    ])
    const [tasks, dispatchTasks] = useReducer(TasksReducer, {
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

//-------------------------------------------------------------

    const toggleIsDone = (todoID: string, taskId: string, isDone: boolean) => {
        dispatchTasks(toggleIsDoneAC(todoID, taskId, isDone))
    }
    const deleteTask = (todoID: string, taskId: string) => {
        dispatchTasks(deleteTaskAC(todoID, taskId))
    }
    const addTask = (todoID: string, title: string) => {
        dispatchTasks(addTaskAC(todoID, title))
    }
    const filteredTodo = (todoID: string, filter: FilterValueType) => {
        dispatchTodo(filteredTodoAC(todoID, filter))
    }
    const addTodo = (todoID: string, title: string) => {
        dispatchTodo(addTodoAC(todoID, title));
        dispatchTasks(addEmptyTasksToNewTodoAC(todoID))
    }
    const deleteTodo = (todoID: string) => {
        dispatchTodo(deleteTodoAC(todoID))
        dispatchTasks(deleteTasksThenTodoDeletedAC(todoID))
    }
    const changeTodoTitle = (todoID: string, title: string) => {
        dispatchTodo(changeTodoTitleAC(todoID, title))
    }
    const changeTaskTitle = (todoID: string, taskID: string, title: string) => {
        dispatchTasks(changeTaskTitleAC(todoID, taskID, title))
    }
//-----------------------------------------------------------

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
                        filterTasks={filteredTodo}
                        deleteTodo={deleteTodo}
                        changeTodoTitle={changeTodoTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    // const themNight = createTheme({
    //     palette: {
    //         primary: {
    //             // Purple and green play nicely together.
    //             main: grey[500],
    //             contrastText: purple[300]
    //         },
    //         secondary: {
    //             // This is green.A700 as hex.
    //             main: '#999999',
    //         },
    //     },
    // });


    const [apearence, setApearence] = useState(false)
    const toggle = () => {
        setApearence(!apearence)
    }
    const theme = createTheme({
        palette: {
            primary: apearence ? green : yellow,
            mode: apearence ? 'light' : 'dark'
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <ButtonAppBar apearence={apearence} toggle={toggle} addTodo={addTodo}/>
                <Container fixed>
                    <Grid container spacing={1}>
                        {todoForRender}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
