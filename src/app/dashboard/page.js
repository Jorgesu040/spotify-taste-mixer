
'use client';

import ArtistWidget from "@/components/widgets/ArtistWidget";

export default function Dashboard() {


    return (
        <main className="min-h-screen bg-spotify-gray-darker p-8">

            {/* Widgets grid - 4 columns */}
            <div className="grid grid-cols-1 gap-4 mb-8">
            {/* Each widget card */}
            <div className="bg-spotify-gray-dark rounded-lg p-4">
                {/* Widget content */}
                <ArtistWidget className="h-full" />
            </div>
            </div>



        </main>
        )
}