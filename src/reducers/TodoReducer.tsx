import type { Todo } from '@/model/todo.model'
import type { InitialData } from '@/model/todo.model'



function TodoReducer() {
    return (state:InitialData, action:{type:string, payload:Todo[] | boolean | null | Error}):InitialData=>{
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
        default:
            return state
      }
     
      return newState
    }
}

export default TodoReducer