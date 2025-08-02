import React, { useEffect } from 'react'
import "./TodoContent.scss"
import { Edit } from 'lucide-react'
import type { Todo } from '@/model/todo.model'
import { todoStatusesColors } from '../constants/todo-constants'
import { useNavigate } from 'react-router'
import TodoDelete from './TodoDelete'

function TodoContent(
    {todo}: {todo: Todo}
) {
 const navigate = useNavigate();
 const dotColor = `bg-${todoStatusesColors[todo.status as keyof typeof todoStatusesColors]}-500`
 const hoverColor = `bg-${todoStatusesColors[todo.status as keyof typeof todoStatusesColors]}-300`

  return (
    <div className="content-container flex flex-row items-center gap-4 justify-evenly p-2 overflow-hidden">
        <div className='content-icon flex items-center justify-between'>
            <span className='border border-blue-900 rounded-full flex self-start items-center justify-center p-2 w-10 h-10 font-bold'>{todo.title[0].toUpperCase()}</span>
        </div>
        <div className='content-title-and-description flex-1 overflow-hidden'>
            <div title={todo.title} className='text-lg text-blue-900 font-bold overflow-hidden text-ellipsis whitespace-nowrap'>{todo.title}</div>
            <div title={todo.description} className='text-sm overflow-hidden text-ellipsis whitespace-nowrap max-w-[100%]'>{todo.description}</div>
            <div title={todo.updatedAt && (new Date(todo.updatedAt)).toDateString()} className='text-sm text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap max-w-[100%]'>{todo.updatedAt && (new Date(todo.updatedAt)).toDateString()}</div>
        </div>
        <div className='content-status flex-1 flex flex-row gap-2 items-center flex-wrap justify-end'>
            <div className={`float-right flex items-center justify-between gap-1 p-2 hover:${hoverColor} cursor-pointer hover:animate-pulse`}>
                <div className={`rounded-full w-[12px] h-[12px] mb-1 font-bold ${dotColor}`}></div>
                <div className='flex-1 overflow-hidden text-ellipsis whitespace-nowrap max-w-[100%]'>{todo.status}</div>
            </div>
            <div className='actions flex flex-row gap-4'>
                <Edit onClick={()=>navigate(`/update/${todo._id??todo?.id}`)}  size={15} className='text-blue-900 cursor-pointer'/>
                <TodoDelete todo={todo}/>
                
            </div>
        </div>
    </div>
  )
}

export default TodoContent