import React, { useContext, useEffect } from 'react'
import TodoSearch from './components/todoSearch'
import TodoListAccordion from './components/TodoListAccordion'
import { Plus } from 'lucide-react'
import { TodoContext } from '@/contexts/TodoContexts'
import { useTodo } from '@/custom-hooks/useTodo'
import { getTodos } from '@/services/todo.service'
import type { Todo } from '@/model/todo.model'
import Header from '@/reusable-components/Header'
import { useNavigate } from 'react-router'
function TodoList() {
  const navigate = useNavigate();
  const {stateData, dispatch} = useContext(TodoContext)  
  const abortController = new AbortController()
  const {callApi, apiDetails} = useTodo(getTodos, abortController)
  useEffect(() => {
    if(localStorage.getItem("todos")?.length){
        dispatch({type:"SET_TODOS", payload:JSON.parse(localStorage.getItem("todos") as string)})
        dispatch({type:"SET_FILTERED_TODOS", payload:JSON.parse(localStorage.getItem("todos") as string)})
        dispatch({type:"SET_LOADING", payload:false as boolean})
        dispatch({type:"SET_ERROR", payload:null as Error | null})
    }
    else{
        abortController?.abort()
        callApi(true);
        dispatch({type:"SET_TODOS", payload:apiDetails.data as Todo[]})
        dispatch({type:"SET_FILTERED_TODOS", payload:apiDetails.data as Todo[]})
        dispatch({type:"SET_LOADING", payload:apiDetails.isLoading as boolean})
        dispatch({type:"SET_ERROR", payload:apiDetails.error as Error | null})
    }
  }, [apiDetails])
  return (
    <div className="todo-list-container h-[100vh] flex flex-col gap-2">
        <Header title="Echo Task"/> 
        <div className='todo-list-content p-2 flex flex-col gap-2 z-10'>
            <TodoSearch/>
            {stateData.isLoading && <div>Loading...</div>}
            {stateData.error && <div>Error: {stateData.error.message}</div>}
            {stateData.data && <TodoListAccordion/>}
        </div>
        <div className='todo-list-footer p-4 absolute bottom-2 right-2' onClick={()=>navigate("/create")}>
        <Plus size={45} color='white' className='rounded-full border-2 border-blue-900 bg-blue-900 cursor-pointer'/>
        </div>
    </div>
)
}

export default TodoList