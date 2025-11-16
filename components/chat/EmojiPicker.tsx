
import React, { useEffect, useRef } from 'react';

const emojis = [ '😀', '😂', '❤️', '👍', '🤔', '🎉', '👋', '🎁', '🙏', '😭', '🤯', '🔥', '😊', '😍', '💯', '🚀', '🥳', '😎', '😇', '💪'];

interface EmojiPickerProps {
    onSelect: (emoji: string) => void;
    onClose: () => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, onClose }) => {
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div ref={pickerRef} className="absolute bottom-20 left-4 bg-white p-4 rounded-xl shadow-2xl grid grid-cols-5 gap-2 animate-fade-in z-10 border border-gray-100">
            {emojis.map(emoji => (
                <button
                    key={emoji}
                    onClick={() => onSelect(emoji)}
                    className="text-2xl p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#0046ff]"
                    aria-label={`emoji ${emoji}`}
                >
                    {emoji}
                </button>
            ))}
        </div>
    );
};
