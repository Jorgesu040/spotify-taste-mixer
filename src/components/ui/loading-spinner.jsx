import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ className, size = 24 }) {
    return (
        <div className={`flex justify-center items-center w-full min-h-[100px] ${className ?? ''}`}>
            <Loader2 className="animate-spin text-spotify-green" size={size} />
        </div>
    );
}
