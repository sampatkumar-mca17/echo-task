import {
    createBrowserRouter,
  } from "react-router";
import TodoList from "./todo-list/TodoList";
import CreateTodo from "./create-update-todo/CreateTodo";
export const Routes = createBrowserRouter([
    {
        path:"/",
        element:<TodoList/>
    },
    {
        path:"/update/:id",
        element:<CreateTodo/>
    },
    {
        path:"/create",
        element:<CreateTodo/>
    }
])