import axios from "axios";
import { useState, useEffect } from "react"

export function useData<T>(url:string, token:string) {
    const [ data, setData ] = useState<T[]>([]);
    const [ error, setError ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        loadData();
    },[])

    const fetchData = async() => {
        const response = await axios.get(url, {headers: {'Authorization': `Bearer ${token}`}});
        return response.data;
    }

    const loadData = async() => {
        try {
            const result = await fetchData();
            setData(result);
        }catch(err){
            setError(`Oops, something went wrong. ${err.message}`)
        }
        setLoading(false);
    }

    return { data, setData, error, loading }
}