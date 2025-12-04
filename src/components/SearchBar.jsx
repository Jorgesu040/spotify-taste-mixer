'use client'

import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
// import '../styles/searchBar.css'



function SearchBar({ fnToCall, persistKey, setResponse, children = "Escribe para empezar a buscar", debounceMs = 300 }) {

    // estado local para el input (respuesta inmediata en UI)
    const [value, setValue] = useState(() => {
        if (persistKey) {
            try {
                const saved = localStorage.getItem(persistKey)
                return saved
            } catch (e) {
                console.error('Error loading persisted search value', e)
            }
        }
        return ''
    })

    // debounce: llama fnToCall y guarda en localStorage tras debounceMs
    useEffect(() => {
        const id = setTimeout(async () => {
            if (value) {
                const result = await fnToCall(value)
                setResponse(result)
            } else {
                setResponse([])
            }

            if (persistKey) {
                try {
                    localStorage.setItem(persistKey, value)
                } catch (e) {
                    console.error('Error saving persisted search value', e)
                }
            }
        }, debounceMs)

        return () => clearTimeout(id)
    }, [value, debounceMs, fnToCall, persistKey, setResponse])


    const handleChange = (event) => {
        setValue(event.target.value)
    }

    return (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-spotify-gray-dark border border-spotify-gray-mid focus-within:border-spotify-green transition-colors" role="search">

            <Search className="text-spotify-gray-light shrink-0" aria-hidden size={18} />
            <span className="text-spotify-gray-mid" aria-hidden>|</span>
            <input
                onChange={handleChange}
                type='text'
                value={value}
                placeholder={children}
                name="text"
                aria-label="Busqueda"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-spotify-gray-light"
            />

        </div>
    )
}

export default SearchBar