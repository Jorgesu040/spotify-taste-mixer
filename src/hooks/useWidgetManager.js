'use client';

import { useState, useEffect } from 'react';

const DEFAULT_WIDGETS = [
    { id: 'artist', label: 'Artists', component: 'ArtistWidget', cols: 1, visible: true },
    { id: 'track', label: 'Tracks', component: 'TrackWidget', cols: 1, visible: true },
    { id: 'genre', label: 'Genres', component: 'GenreWidget', cols: 1, visible: true },
    { id: 'top', label: 'Top Items', component: 'TopWidget', cols: 3, visible: true },
    { id: 'decade', label: 'Decades', component: 'DecadeWidget', cols: 2, visible: true },
    { id: 'popularity', label: 'Popularity', component: 'PopularityWidget', cols: 1, visible: true },
];

export function useWidgetManager() {
    // Initial state from localStorage or default
    const [widgets, setWidgets] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('dashboard_widgets_v1');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Merge with default to ensure no missing ids if we update code later
                // This simple version just trusts localstorage if present, 
                // but in prod we'd want to merge/validate.
                setWidgets(parsed);
            } catch (e) {
                setWidgets(DEFAULT_WIDGETS);
            }
        } else {
            setWidgets(DEFAULT_WIDGETS);
        }
        setIsLoaded(true);
    }, []);

    const saveWidgets = (newWidgets) => {
        setWidgets(newWidgets);
        localStorage.setItem('dashboard_widgets_v1', JSON.stringify(newWidgets));
    };

    const toggleWidget = (id) => {
        const newWidgets = widgets.map(w =>
            w.id === id ? { ...w, visible: !w.visible } : w
        );
        saveWidgets(newWidgets);
    };

    const reorderWidgets = (newOrder) => {
        saveWidgets(newOrder);
    };

    return {
        widgets,
        toggleWidget,
        reorderWidgets,
        isLoaded
    };
}
