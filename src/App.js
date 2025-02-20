import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import "./App.css";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: {
                        todoList: JSON.parse(
                            localStorage.getItem("savedTodoList")
                        ),
                    },
                });
            }, 2000);
        }).then(
            (result) => setTodoList(result.data.todoList),
            setIsLoading(false)
        );
    }, []);

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("savedTodoList", JSON.stringify(todoList));
        }
    }, [todoList]);

    const addTodo = (newTodo) => {
        setTodoList([...todoList, newTodo]);
    };

    const removeTodo = (id) => {
        const filteredTodoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(filteredTodoList);
    };
    const loadingRender = isLoading ? (
        <p>Loading...</p>
    ) : (
        <TodoList onRemoveTodo={removeTodo} todoList={todoList} />
    );

    return (
        <>
            <h1>To Do List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            {loadingRender}
        </>
    );
}

export default App;
