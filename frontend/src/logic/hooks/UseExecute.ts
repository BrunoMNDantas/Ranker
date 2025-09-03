import { useState, useEffect } from "react";

export function useExecute<T>(operation: ()=>Promise<T>) {
    const [result, setResult] = useState<T | null>(null);
    const [executing, setExecuting] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let destroyed = false
        setExecuting(true)

        operation()
            .then(res => {
                if(!destroyed) setResult(res as T)
                return res
            })
            .catch(err => {
                if(!destroyed) setError(err)
            })
            .finally(() => {
                if(!destroyed) setExecuting(false)
            });

        return () => { destroyed = true }
    }, [ operation ])

    return { result, executing, error }
}