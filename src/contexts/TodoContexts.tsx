import { createContext } from 'react'
import type { Todo } from '@/model/todo.model'
import type { InitialData } from '@/model/todo.model'
import { INITIAL_DATA } from './constatns'

export const TodoContext = createContext<{stateData:InitialData, dispatch:React.Dispatch<{type:string, payload:Todo[] | boolean | null | Error}>}>({
    stateData:INITIAL_DATA,
    dispatch:()=>{}
})

    
