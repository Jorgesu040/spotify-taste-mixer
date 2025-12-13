'use client';

import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronRight, GripVertical, Check, Plus, ArrowUp } from 'lucide-react';

const SortableItem = ({ widget, onToggle }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: widget.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="flex items-center justify-between p-2 mb-2 bg-spotify-gray-dark rounded-md group">
            <div className="flex items-center gap-2">
                <button {...attributes} {...listeners} className="cursor-grab hover:text-white text-gray-400">
                    <GripVertical size={16} />
                </button>
                <span className="text-sm font-medium text-gray-200">{widget.label}</span>
            </div>
            <button
                onClick={() => onToggle(widget.id)}
                className={`w-5 h-5 rounded-full flex items-center justify-center border ${widget.visible ? 'bg-spotify-green border-transparent' : 'border-gray-500 hover:border-white'}`}
            >
                {widget.visible && <Check size={12} className="text-black" />}
            </button>
        </div>
    );
};

export default function Sidebar({ widgets, onToggle, onReorder }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = widgets.findIndex((w) => w.id === active.id);
            const newIndex = widgets.findIndex((w) => w.id === over.id);
            onReorder(arrayMove(widgets, oldIndex, newIndex));
        }
    };

    return (
        <>
            {/* Botón de apertura/cierre */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed top-20 left-0 z-50 p-2 bg-spotify-green rounded-r-md transition-transform ${isOpen ? '-translate-x-full' : 'translate-x-0'}`}
            >
                <ChevronRight size={20} className="text-black" />
            </button>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-black/75 backdrop-blur-xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
                <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Configuración</h2>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <ChevronRight size={20} className="rotate-180" />
                        </button>
                    </div>

                    {/* Navegación */}
                    <div className="mb-6 space-y-2">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full text-left p-2 hover:bg-spotify-gray-dark rounded flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                            <ArrowUp size={16} /> Ir al inicio
                        </button>
                        {/* Placeholder de Import Playlist */}
                        <button className="w-full text-left p-2 hover:bg-spotify-gray-dark rounded flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                            <Plus size={16} /> Cargar Playlist
                        </button>
                    </div>

                    {/* Reordenar y seleccionar Widgets */}
                    <div className="flex-1">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Widgets</h3>
                        <DndContext  collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={widgets.map(w => w.id)} strategy={verticalListSortingStrategy}>
                                {widgets.map(widget => (
                                    <SortableItem key={widget.id} widget={widget} onToggle={onToggle} />
                                ))}
                            </SortableContext>
                        </DndContext>
                    </div>

                    <div className="text-xs text-center text-gray-500 mt-4">
                        Arrastra para ordenar los widgets
                    </div>
                </div>
            </aside>
        </>
    );
}
