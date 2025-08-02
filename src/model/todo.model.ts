export interface Todo {
    _id?:string,
    id?:string,
    title:string,
    description?:string,
    status:string,
    createdAt?:string,
    updatedAt?:string,
    dueDate?:string,
    priority?:string,
    tags?:string[]
}

export interface InitialData {
    data:Todo[],
    filteredData:Todo[],
    isLoading:boolean,
    error:Error | null,
    searchKey:string
}
    