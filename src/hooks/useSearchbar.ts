import { useState } from "react"

export const useSearchbar = () => {
    const [filter, setFilter] = useState<Filter>({
        keyword: ""
    })

    const handleSelect = (type: Filter["type"]) => {
        setFilter({
            ...filter,
            type: type
        })
    }
    const handleTyping = (keyword: string) => {
        setFilter({
            ...filter,
            keyword: keyword.trim()
        })
    }

    return { filter, handleSelect, handleTyping }
}