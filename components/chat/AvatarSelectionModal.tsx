
import React, { useEffect, useRef } from 'react';

const predefinedAvatars = [
    'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    'https://i.pravatar.cc/150?u=a042581f4e29026704a',
    'https://i.pravatar.cc/150?u=a042581f4e29026704b',
    'https://i.pravatar.cc/150?u=a042581f4e29026704c',
];

interface AvatarSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (avatarUrl: string) => void;
}

export const AvatarSelectionModal: React.FC<AvatarSelectionModalProps> = ({ isOpen, onClose, onSelect }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const triggerElementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            triggerElementRef.current = document.activeElement as HTMLElement;
            closeButtonRef.current?.focus();
        } else {
            triggerElementRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
            if (event.key === 'Tab') {
                const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (!focusableElements || focusableElements.length === 0) return;

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

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);


    if (!isOpen) return null;

    return (
        <div 
            className="absolute inset-0 bg-black/30 flex items-center justify-center z-50"
            onClick={onClose}
            role="presentation"
        >
            <div 
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm animate-fade-in"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="avatar-modal-title"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 id="avatar-modal-title" className="text-lg font-bold text-gray-800">Choose your avatar</h3>
                    <button ref={closeButtonRef} onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0046ff]" aria-label="Close avatar selection">&times;</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {predefinedAvatars.map((avatar, index) => (
                         <button
                            key={index}
                            className="p-0 border-0 bg-transparent rounded-full focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-[#0046ff] transition-all"
                            onClick={() => onSelect(avatar)}
                            aria-label={`Select Avatar ${index + 1}`}
                        >
                            <img
                                src={avatar}
                                alt=""
                                className="w-20 h-20 rounded-full cursor-pointer"
                            />
                        </button>
                    ))}
                     <div 
                        className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center cursor-not-allowed border-2 border-dashed border-gray-400 text-gray-500"
                        title="Upload feature coming soon!"
                        aria-disabled="true"
                        role="button"
                     >
                        <svg className="w-8 h-8" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
