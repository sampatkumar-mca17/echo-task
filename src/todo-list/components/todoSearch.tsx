import React, { useEffect, useRef } from 'react'
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {debounceTime, fromEvent, map} from 'rxjs';
import { TodoContext } from '@/contexts/TodoContexts';
import { useContext } from 'react';
import type { Todo } from '@/model/todo.model';
function todoSearch() {
  const {stateData, dispatch} = useContext(TodoContext)
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(()=>{
   const subscription =  fromEvent(inputRef.current as HTMLInputElement, 'input').pipe(
      debounceTime(500),
      map((event: any) => event.target.value) 
    ).subscribe((event)=>{
      console.log(event);
      let filteredTodos = stateData.data
      if(event?.length){
        filteredTodos = stateData.data?.filter((todo:Todo)=>todo.title.toLowerCase().includes(event.toLowerCase()))
      }
      dispatch({type:"SET_FILTERED_TODOS", payload:filteredTodos})
    })
    return ()=>subscription.unsubscribe();
  },[])
  return (
    <div className='todo-list-search flex items-center gap-2 relative'>
    <Search size={15} className='absolute left-2 top-[15px] text-black-500' />
    <Input ref={inputRef} size={1} placeholder='Search To Do' className='pl-6 h-12'/>
    </div>
  )
}

export default todoSearch
