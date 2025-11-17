
import React, { useEffect, useRef } from 'react';

const emojis = [ '😀', '😂', '❤️', '👍', '🤔', '🎉', '👋', '🎁', '🙏', '😭', '🤯', '🔥', '😊', '😍', '💯', '🚀', '🥳', '😎', '😇', '💪'];

interface EmojiPickerProps {
    onSelect: (emoji: string) => void;
    onClose: () => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, onClose }) => {
    const pickerRef = useRef<HTMLDivElement>(null);
    const triggerElementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        triggerElementRef.current = document.activeElement as HTMLElement;
        const focusableElements = Array.from(pickerRef.current?.querySelectorAll('button') || []) as HTMLButtonElement[];
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
             if (event.key === 'Tab' && focusableElements.length > 0) {
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
            triggerElementRef.current?.focus();
        };
    }, [onClose]);

    return (
        <div 
            id="emoji-picker"
            ref={pickerRef} 
            className="absolute bottom-20 left-4 bg-white p-4 rounded-xl shadow-2xl grid grid-cols-5 gap-2 animate-fade-in z-10 border border-gray-100"
            role="dialog"
            aria-label="Emoji picker"
        >
            {emojis.map(emoji => (
                <button
                    key={emoji}
                    onClick={() => onSelect(emoji)}
                    className="text-2xl p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#0046ff]"
                    aria-label={`Select emoji ${emoji}`}
                >
                    {emoji}
                </button>
            ))}
        </div>
    );
};
