import React, { useReducer } from 'react'
import TodoReducer from '@/reducers/TodoReducer'
import { TodoContext } from './TodoContexts'
import { INITIAL_DATA } from './constatns';
function TodoProvider({children}: {children: React.ReactNode}) {
    const [stateData, dispatch] = useReducer(TodoReducer(), INITIAL_DATA);
    return (
        <TodoContext.Provider value={{stateData, dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider