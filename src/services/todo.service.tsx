import type { Todo } from "@/model/todo.model"

export const getTodos = async(_:boolean,signal?: AbortSignal):Promise<Todo[]> => {
    try{
        const response = await fetch("https://shrimo.com/fake-api/todos",{signal})
        if(response.ok){
            return await response.json()
        }
        else{
            throw new Error("Failed to get todos")
        }
    }
    catch(error){
        throw error
    }
}
export const createTodo = async(todo:Todo, signal?: AbortSignal):Promise<Todo> => {
    try{
        const response = await fetch("https://shrimo.com/fake-api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
        },
        signal,
        body: JSON.stringify(todo)
        })
        if(response.ok){
            return await response.json()
        }
        else{
            throw new Error("Failed to create todo")
        }
    }
    catch(error){
        throw error
    }
}

export const updateTodo = async(todo:Todo, signal?: AbortSignal):Promise<Todo> => {
    try{
        const response = await fetch(`https://shrimo.com/fake-api/todos/${todo._id??todo?.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
        },
        body: JSON.stringify(todo),
        signal
        })
        if(response.ok){
            return await response.json()
        }
        else{
            throw new Error("Failed to update todo")
        }
    }
    catch(error){
        throw error
    }
}

export const deleteTodo = async(todo:Todo, signal?: AbortSignal):Promise<Todo> => {
    try{
        const response = await fetch(`https://shrimo.com/fake-api/todos/${todo._id??todo?.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
        },
        signal
        })
        if(response.ok){
            return await response.json()
        }
        else{
            throw new Error("Failed to delete todo")
        }
    }
    catch(error){
        throw error
    }
}
