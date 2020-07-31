import { useState, useMemo } from 'react'
import { useDebounce } from './useDebounce' 

export const useSearch = (options: string[]) => {
    const [query, setQuery] = useState<string>('')
    const debouncedQuery = useDebounce(query, 150)

    const filtered = useMemo(() => {
        return debouncedQuery === '' ? options : options.filter(option => option.toLowerCase().includes(debouncedQuery.toLowerCase()))
    }, [options, debouncedQuery])

    return {
        setQuery,
        query,
        filtered
    }
}
