import React, {useEffect} from "react"
import { useLocation } from "react-router"

export default function SuggestionPage() {
    const path = useLocation()

    useEffect(() => {
        localStorage.setItem('url', path.pathname)
    },[path])

    return (
        <div>
            Suggestion Page
        </div>
    )
}