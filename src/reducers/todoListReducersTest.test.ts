import {v1} from 'uuid';
import {deleteTodoAC, TodoReducer, ToDoType} from './todoReducer';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: ToDoType[] = [
        {todoID: todolistId1, title: "What to learn", filter: "All"},
        {todoID: todolistId2, title: "What to buy", filter: "All"}
    ]

    // const endState = todolistsReducer(startState,
    //     { type: 'REMOVE-TODOLIST', id: todolistId1})

    const endState = TodoReducer(startState, deleteTodoAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].todoID).toBe(todolistId2);
});