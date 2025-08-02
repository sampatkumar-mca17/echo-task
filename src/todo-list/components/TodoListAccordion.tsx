import type { Todo } from '@/model/todo.model';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion'
import { Separator } from '@/components/ui/separator';
import React, { useContext } from 'react'
import TodoContent from './TodoContent';
import { todoStatuses } from '../constants/todo-constants';
import TodoListTrigger from './TodoListTrigger';
import TodoListNullState from './TodoListNullState';
import { TodoContext } from '@/contexts/TodoContexts';

function TodoListAccordion() {
    const {stateData, dispatch} = useContext(TodoContext)  
    const [open, setOpen] = React.useState<{"in-progress": boolean, "pending": boolean, "completed": boolean}>({"in-progress": true, "pending": false, "completed": false});
    const inProgressTodos = stateData.filteredData.filter(todo => todo.status === todoStatuses.inProgress);
    const pendingTodos = stateData.filteredData.filter(todo => todo.status === todoStatuses.notStarted);
    const completedTodos = stateData.filteredData.filter(todo => todo.status === todoStatuses.completed);
    const todosGroupedByStatus={
        "in-progress":inProgressTodos,
        "pending":pendingTodos,
        "completed":completedTodos
}

    const getOpenValue = () => {
        if(open["in-progress"]) return "in-progress"
        if(open.pending) return "pending"
        if(open.completed) return "completed"
        return "in-progress"
    }
    function onAccordionOpenStateChange(value: string) {
        setOpen({"in-progress": value === "in-progress", pending: value === "pending", completed: value === "completed"})
    }
    return (
        <Accordion type="single"  
        collapsible
        className="w-full flex flex-col gap-3"
        defaultValue={getOpenValue()}
        onValueChange={onAccordionOpenStateChange}
        >
        {Object.keys(todosGroupedByStatus).map((todo:string)=>(
            <AccordionItem key={todo} value={todo} className='w-full overflow-y-auto' >
                <AccordionTrigger className='bg-gray-200 text-dark p-4 flex flex-row justify-between w-full cursor-pointer'>
                    <TodoListTrigger todo={todo} open={open} todosGroupedByStatus={todosGroupedByStatus} /> 
                </AccordionTrigger>
                {open[todo as keyof typeof open] && (
                    <div className='max-h-[calc(100vh-(87px+36px+54px+50px+170px))] overflow-y-auto p-2'>
                        {todosGroupedByStatus[todo as keyof typeof todosGroupedByStatus].map((todo:Todo, index:number) => (
                            <React.Fragment key={(todo._id??todo?.id??'')+'fragment'}>
                                <AccordionContent key={(todo._id??todo?.id??'')+'content'} className='w-full'>
                                    <TodoContent todo={todo}/>
                                </AccordionContent>
                                <Separator key={(todo._id??todo?.id??'')+'seperator'} orientation='horizontal'/>
                            </React.Fragment>
                        ))}
                        {todosGroupedByStatus[todo as keyof typeof todosGroupedByStatus].length === 0 && (
                            <TodoListNullState/>
                        )}
                    </div>
                )}
            </AccordionItem>
        ))}

    </Accordion>
    )
}

export default TodoListAccordion