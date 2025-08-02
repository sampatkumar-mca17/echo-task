import Header from '@/reusable-components/Header'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Formik } from 'formik'
import AddTodoForm from './components/AddTodoForm'
import { createTodo, updateTodo } from '@/services/todo.service'
import { useTodo } from '@/custom-hooks/useTodo'
import type { Todo } from '@/model/todo.model'
import { TodoContext } from '@/contexts/TodoContexts'
import { toast } from 'sonner'
  function CreateTodo() {
  const navigate = useNavigate();
  const params = useParams();
  const [dataToBeUpdated, setDataToBeUpdated] = useState<Todo | null>(null)
  const abortController = useRef(new AbortController())
  const {callApi, apiDetails} = useTodo((params?.id ? updateTodo : createTodo) as (todo:Todo)=>Promise<Todo>, abortController.current)
  const {stateData, dispatch} = useContext(TodoContext)
  useEffect(()=>{
    if(apiDetails.data){
      const todoList:Todo[] | null = (JSON.parse((localStorage.getItem("todos")?? '') as string))
      if(dataToBeUpdated){
       updateTodoList(todoList)
      }
      else{
        addTodoList(todoList)
      }
      toast(`Todo ${params.id ? "updated" : "created"} successfully`)
    }
    if(apiDetails.error){
      toast(`Todo ${params.id ? "update" : "creation"} failed`)
    }
  },[apiDetails])

  useEffect(()=>{
    if(params.id){
      const todo = stateData.data?.find((todo:Todo)=>(todo._id??todo?.id)===params.id)
      if(todo){
        setDataToBeUpdated(todo)
      }
    }
  },[])

  function updateTodoList(todoList:Todo[] | null){
    const updatedData = {...dataToBeUpdated,...apiDetails.data?.data}
    const updatedTodoList:Todo[] | null = todoList?.map((todo:Todo)=>todo._id===dataToBeUpdated?._id?updatedData:todo) as Todo[]
    if(updatedTodoList){
      dispatch({type:"SET_TODOS", payload:updatedTodoList})
    }
  }
  
  function addTodoList(todoList:Todo[] | null){
    todoList?.push(apiDetails.data?.data)
    dispatch({type:"SET_TODOS", payload:todoList})
  }

  const onSubmit = (values:{title:string, description:string, status:string})=>{    
    callApi(params.id ? getUpdatePayload(values) : getCreatePayload(values))
  }

  const onCancel = ()=>{
    abortController?.current?.abort()
    navigate("/")
  }

  function getCreatePayload(values:{title:string, description:string, status:string}){
    return{
      ...values,
      dueDate: (new Date()).toISOString(),
      priority:'High',
      tags:[]
    }
  }

  function getUpdatePayload(values:{title:string, description:string, status:string}){
    return{
      ...dataToBeUpdated,
      ...values
    }
  }
  const errorHandler = (values:{title:string, description:string, status:string})=>{
    const errors = {} as {title?:string, description?:string,status?:string}
    if(!values.title){
      errors.title="Title is required"
    }
    if(!values.description){
      errors.description="Description is required"
    }
    if(!values.status){
      errors.status="Status is required"
    }
    return errors;
  }

  const initialFormValues= {
    title:dataToBeUpdated?.title??"", 
    description:dataToBeUpdated?.description??"", 
    status:dataToBeUpdated?.status??"Not Started"
  }

  const createTodoHTML= (    
    <Formik 
    initialValues={initialFormValues} onSubmit={(values)=>onSubmit(values)}
    validate={errorHandler}
    > 
      {({values, handleChange, handleSubmit, errors, touched})=>{
        return (
          <AddTodoForm mode={params.id ? "update" : "create"} onCancel={onCancel} values={values} handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} touched={touched} apiDetails={apiDetails}/>
        )
      }}
    </Formik>
  )
const noDataFoundHTML = (
      <div className='flex flex-col gap-2'>
        <p className='text-2xl font-bold'>No data found</p>
        <p className='text-lg'>No data found for the given id</p>
      </div>
)
  return (
    <div className='create-todo-container h-[100vh] flex flex-col gap-2'>
    <Header title="Add Task" onBack={()=>navigate("/")}/>
    <div className='create-todo-content p-2 flex flex-col gap-2 z-10'>
      {(!params.id || dataToBeUpdated) ? createTodoHTML : noDataFoundHTML}
    </div>
    </div>
  )
}

export default CreateTodo