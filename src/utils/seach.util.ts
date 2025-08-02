import { Todo } from "@/model/todo.model";

export const search = (searchKey:string, data:Todo[]) =>{
    return data.filter(todo=>todo.title.includes(searchKey))
}