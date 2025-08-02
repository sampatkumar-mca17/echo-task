import type { Todo } from '@/model/todo.model'
import type { InitialData } from '@/model/todo.model'
import { search } from '@/utils/seach.util';



function TodoReducer() {
    return (state:InitialData, action:{type:string, payload:Todo[] | boolean | null | Error | string}):InitialData=>{
      let newState = {} as InitialData;
      switch(action.type){
        case "SET_LOADING":
            newState= {...state, isLoading:action.payload as boolean}
            return newState
        case "SET_TODOS":
            newState= {...state, data:action.payload as Todo[]}
            if(newState.data){
                localStorage.setItem("todos", JSON.stringify(newState.data))
            }
            return newState
        case "SET_ERROR":
            newState= {...state, error:action.payload as Error | null}
            return newState
        case "SET_FILTERED_TODOS":
            newState= {...state, filteredData:action.payload as Todo[]}
            return newState
        case "SET_SEARCH_KEY":
            newState= {...state, searchKey:action.payload as string}
            newState= {...state, filteredData:search(newState.searchKey, state.data)}
            return newState
        default:
            return state
      }
     
      return newState
    }
}

export default TodoReducer