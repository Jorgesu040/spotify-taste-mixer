
'use client';

import CursorBlob from "@/components/CursorBlob";
import ArtistWidget from "@/components/widgets/ArtistWidget";
import TrackWidget from "@/components/widgets/TrackWidget";

export default function Dashboard() {


    return (
        <main className="min-h-screen bg-spotify-gray-darker p-2 sm:p-4 md:p-6 lg:p-8">

            {/* Widgets grid - 4 columns */}
            <CursorBlob blobIsInfront={true} className=" p-4 shadow-[inset_-5px_-10px_30px_-10px_rgba(128,128,128,0.5)] backdrop-blur-md rounded-lg grid grid-cols-2 gap-4 mb-8 place-items-center bg-accent/50">
                {/* Each widget card */}
                <div className="relative z-1 bg-spotify-gray-dark rounded-lg p-4">
                    {/* Widget content */}

                    <ArtistWidget />
                </div>

                <div className="relative z-1 bg-spotify-gray-dark rounded-lg p-4">
                    {/* Widget content */}
                    <TrackWidget />
                </div>
            </CursorBlob>



        </main>
    )
}