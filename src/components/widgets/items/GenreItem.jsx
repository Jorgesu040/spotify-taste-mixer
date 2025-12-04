'use client'

export default function GenreItem({ children }) {
    const text = typeof children === 'string' ? children : String(children)

    return (
        <div className="inline-block hover:shadow-[inset_-5px_-10px_10px_-5px_rgba(128,128,128,0.3)] backdrop-blur-md bg-spotify-gray-darker/50 text-white rounded-md px-3 py-2 transition ease-in-out duration-200 cursor-pointer">
            {text}
        </div>
    )
}


/*
shadow-[inset_0_-20px_30px_-10px_rgba(0,0,0,0.5)]
              │    │   │     │     │
              │    │   │     │     └── color
              │    │   │     └── spread (negative = smaller)
              │    │   └── blur
              │    └── Y offset (negative = bottom)
              └── X offset


*/