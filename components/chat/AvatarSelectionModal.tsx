
import React from 'react';

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
    if (!isOpen) return null;

    return (
        <div 
            className="absolute inset-0 bg-black/30 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Choose your avatar</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {predefinedAvatars.map((avatar, index) => (
                        <img
                            key={index}
                            src={avatar}
                            alt={`Avatar ${index + 1}`}
                            className="w-20 h-20 rounded-full cursor-pointer transition-all hover:ring-4 hover:ring-[#0046ff]"
                            onClick={() => onSelect(avatar)}
                        />
                    ))}
                     <div 
                        className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-400 text-gray-500 hover:bg-gray-300 hover:border-[#0046ff]"
                        title="Upload feature coming soon!"
                     >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
