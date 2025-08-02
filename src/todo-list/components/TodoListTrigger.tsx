import React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { todoStatusesDisplayName } from '../constants/todo-constants'
import type { Todo } from '@/model/todo.model'

function TodoListTrigger({todo, open, todosGroupedByStatus}: {todo: string, open: {"in-progress": boolean, "pending": boolean, "completed": boolean}, todosGroupedByStatus: {"in-progress": Todo[], "pending": Todo[], "completed": Todo[]}}) {
  return (
    <>
        <div>
        {todoStatusesDisplayName[todo as keyof typeof todoStatusesDisplayName]}(<span className='text-slate-950 font-bold'>{todosGroupedByStatus[todo as keyof typeof todosGroupedByStatus].length}</span>)
        </div> 
        {open[todo as keyof typeof open] && <ChevronDown size={20}/>}
        {!open[todo as keyof typeof open] && <ChevronUp  size={20}/>}  
    </>
  )
}

export default TodoListTrigger