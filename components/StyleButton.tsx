import React, { memo } from 'react';
import { StylePreset } from '../types';

interface StyleButtonProps {
    style: StylePreset;
    index: number;
    isSelected: boolean;
    onSelect: (style: StylePreset) => void;
}

export const StyleButton: React.FC<StyleButtonProps> = memo(({ style, index, isSelected, onSelect }) => {
    return (
        <button
            onClick={() => onSelect(style)}
            className={`
                flex flex-col items-start text-left px-4 py-4 border-b-2 last:border-b-0 border-black/10 transition-colors rounded-lg
                ${isSelected
                    ? 'bg-[#2E5339] text-white'
                    : 'hover:bg-black/5 text-black'}
            `}
        >
            <span className="font-bold text-sm uppercase block mb-1 tracking-wide">{index + 1}. {style.label}</span>
            <span className={`text-[10px] leading-tight block font-medium uppercase ${isSelected ? 'opacity-100' : 'opacity-90'}`}>
                {style.description}
            </span>
        </button>
    );
});
