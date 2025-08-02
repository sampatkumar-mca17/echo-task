import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

function AddTodoForm({mode, handleSubmit, values, handleChange, errors, touched, apiDetails, onCancel}:any) {
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-8 p-2 justify-start items-start w-[100%] h-[calc(100vh-100px)]'>
        <Card className='w-[100%]'>
        <CardHeader>
            <CardTitle>{mode === "update" ? "Update Task" : "Add Task"}</CardTitle>
            <CardDescription>{mode === "update" ? "Update a task" : "Create a new task"}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className='flex flex-col gap-4 w-[100%]'>
            <Label htmlFor="title">Title<p className='text-red-500'>*</p></Label>
            <Input className='flex-1 p-4' name="title" placeholder='Title' value={values.title} onChange={handleChange} />
            {touched.title && errors.title && <p className='text-red-500'>{errors.title}</p>}
            <Label htmlFor="description">Description</Label>
            <Textarea title='Description' className='flex-1' name="description" placeholder='Description' value={values.description} onChange={handleChange} />
            {touched.description && errors.description && <p className='text-red-500'>{errors.description}</p>}
            <select name="status" value={values.status} onChange={handleChange} className='p-4 cursor-pointer'>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            </div>
        </CardContent>
        <CardFooter>
            <div className='actions flex flex-row gap-2 justify-end items-end w-[100%]'>
            <Button variant="secondary" type="button" onClick={onCancel}>Cancel</Button>
            <Button variant="default" type="submit" disabled={apiDetails.isLoading}>Submit</Button>
            </div>
        </CardFooter>
        </Card>
    </form>
  )
}

export default AddTodoForm