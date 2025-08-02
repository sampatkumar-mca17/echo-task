import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Loader, Trash2 } from 'lucide-react'
import type{ Todo } from '@/model/todo.model'
import React, { useContext, useEffect, useRef } from 'react'
import { TodoContext } from '@/contexts/TodoContexts'
import { useTodo } from '@/custom-hooks/useTodo'
import { deleteTodo } from '@/services/todo.service'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'


function TodoDelete({todo}: {todo: Todo}) {
    const {stateData, dispatch} = useContext(TodoContext);
    const abortController = useRef<AbortController>(new AbortController())
    const {callApi, apiDetails} = useTodo(deleteTodo, abortController.current);
    function handleDelete(){
        callApi(todo)
    }
    useEffect(()=>{
        if(apiDetails.data){
         const updatedData = stateData.data.filter((todoData:Todo)=>(todoData._id??todoData?.id)!==(todo._id??todo.id));
         const updatedFilteredData = stateData.filteredData.filter((todoData:Todo)=>(todoData._id??todoData?.id)!==(todo._id??todo.id));
         dispatch({type:"SET_TODOS", payload:updatedData})
         dispatch({type:"SET_FILTERED_TODOS", payload:updatedFilteredData})
         toast("Todo deleted successfully");
        }
    },[apiDetails])
  return (
    <Dialog>
    <DialogTrigger>
        <Trash2 size={15} className='text-red-900 cursor-pointer'/>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>{`Do you really want to delete ${todo.title}`}</DialogTitle>
        <DialogDescription>
           {` This action cannot be undone. This will permanently delete ${todo.title}`}
        </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex flex-row gap-2 justify-end'>
            <DialogClose asChild onClick={()=>abortController.current?.abort()}>
                <Button className='cursor-pointer' variant="secondary" >Cancel</Button>
            </DialogClose>
            <Button disabled={apiDetails.isLoading} className='cursor-pointer' variant="destructive" onClick={handleDelete}>
                {apiDetails.isLoading ? <Loader className='animate-spin'/> : "Delete"}
            </Button>
        </DialogFooter>
    </DialogContent>
</Dialog>
  )
}

export default TodoDelete