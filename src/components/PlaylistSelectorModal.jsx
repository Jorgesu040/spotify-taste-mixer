'use client';

import { useState, useEffect } from 'react';
import { X, Music2, Loader2 } from 'lucide-react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { fetchUserPlaylists, fetchPlaylistTracks } from '@/lib/spotifyFetch';
import TextSpanWrapper from '@/components/TextSpanWrapper';
import PlaylistItem from '@/components/widgets/items/PlaylistItem';

export default function PlaylistSelectorModal({ isOpen, onClose, onSelect }) {
    const [playlists, setPlaylists] = useState([]);
    const [importingId, setImportingId] = useState(null);

    useEffect(() => {
        if (isOpen) {
            loadPlaylists();
        }
    }, [isOpen]);

    const loadPlaylists = async () => {
        try {
            const items = await fetchUserPlaylists(50);
            setPlaylists(items || []);
        } catch (error) {
            console.error('Error loading playlists:', error);
        }
    };

    const handleSelect = async (playlist) => {
        setImportingId(playlist.id);
        try {
            const tracks = await fetchPlaylistTracks(playlist.id);
            onSelect(tracks);
            onClose();
        } catch (error) {
            console.error('Error importing playlist:', error);
        } finally {
            setImportingId(null);
        }
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-2xl bg-spotify-gray-dark border border-white/10 rounded-xl shadow-2xl max-h-[80vh] flex flex-col">
                    {/* Header */}
                    <DialogTitle className="flex items-center justify-between p-6 border-b border-white/10">
                        <div className="flex items-center gap-2 text-xl font-bold text-white">
                            <Music2 className="text-spotify-green" />
                            <TextSpanWrapper makeSmall={true} >Importar Playlist</TextSpanWrapper>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </DialogTitle>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        {playlists.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">
                                No se encontraron playlists públicas.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {playlists.map((playlist) => (
                                    <PlaylistItem
                                        key={playlist.id}
                                        onSelect={handleSelect}
                                        isImporting={importingId === playlist.id}
                                    >
                                        {playlist}
                                    </PlaylistItem>
                                ))}
                            </div>
                        )}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
