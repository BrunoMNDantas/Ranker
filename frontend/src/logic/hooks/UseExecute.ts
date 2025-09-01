import { useState, useEffect } from "react";

export function useExecute<T>(operation: ()=>Promise<T>) {
    const [result, setResult] = useState<T | null>(null);
    const [executing, setExecuting] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let distroyed = false
        setExecuting(true)

        operation()
            .then(res => {
                if(!distroyed) setResult(res as T)
                return res
            })
            .catch(err => {
                if(!distroyed) setError(err)
            })
            .finally(() => {
                if(!distroyed) setExecuting(false)
            });

        return () => { distroyed = true }
    }, [ operation ])

    return { result, executing, error }
}