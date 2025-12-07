import { ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"

export default function DecadeItem({ value, onChange, decades, placeholder }) {
    const handleValueChange = (newValue) => {
        if (newValue === value) {
            onChange(null);
        } else {
            onChange(newValue);
        }
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-spotify-gray-mid border border-spotify-gray-light/30 text-foreground focus:outline-none focus:border-spotify-green transition-colors">
                    <span className={value ? "text-foreground" : "text-spotify-gray-light"}>
                        {value ? `${value}s` : placeholder}
                    </span>
                    <ChevronDown size={18} className="text-spotify-gray-light" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-60 overflow-y-auto bg-spotify-gray-mid border-spotify-gray-light/30">
                    
                    <DropdownMenuRadioGroup value={value} onValueChange={handleValueChange}>
                        {decades.map((decade) => (
                            <DropdownMenuRadioItem 
                                key={decade} 
                                value={String(decade)}
                                className="cursor-pointer hover:bg-spotify-gray-dark"
                            >
                                {decade}s
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}