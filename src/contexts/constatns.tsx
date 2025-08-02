import type { Todo } from "@/model/todo.model";

export const INITIAL_DATA = {
    data:[] as  Todo[],
    filteredData:[] as  Todo[],
    isLoading:false,
    error:null
}