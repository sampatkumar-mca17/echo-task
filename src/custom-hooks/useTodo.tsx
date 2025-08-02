import { useEffect, useState } from "react";

export const useTodo = (apiFn:(args:any, signal?: AbortSignal)=>Promise<any>, abortController?: AbortController) => {
    const [run, callApi] = useState<any>(null)
    const [apiDetails, setApiDetails] = useState({data: null as any, error:null as Error | null, isLoading:false})
    useEffect(()=>{
        if(run){
            setApiDetails({
                data:null,
                error:null,
                isLoading:true
            })
            apiFn(run, abortController?.signal).then((resp)=>{
                setApiDetails({
                    data:resp,
                    error:null,
                    isLoading:false
                })
            }).catch((error:any)=>{
                setApiDetails({
                    data:null,
                    error:error as Error,
                    isLoading:false
                })
            })
        }
    },[run])
    return {callApi, apiDetails}
}