
import React from 'react';
import { ChevronDownIcon, MoreVertIcon, SearchIcon, CloseIcon } from '../icons';

interface ChatHeaderProps {
    userAvatar: string;
    onAvatarClick: () => void;
    isSearchOpen: boolean;
    onSearchToggle: () => void;
    searchQuery: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
    userAvatar, 
    onAvatarClick,
    isSearchOpen,
    onSearchToggle,
    searchQuery,
    onSearchChange
}) => (
    <div className="bg-[#0046ff] text-white p-4 rounded-t-2xl flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="relative">
                <button 
                    onClick={onAvatarClick}
                    className="p-0 border-0 bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0046ff] focus:ring-white"
                    aria-label="Change your avatar"
                >
                    <img 
                        src={userAvatar} 
                        alt="Your Avatar" 
                        className="w-12 h-12 rounded-full border-2 border-white cursor-pointer transition-transform hover:scale-110"
                    />
                </button>
                <span aria-hidden="true" className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 border-2 border-[#0046ff]"></span>
            </div>
            {isSearchOpen ? (
                <div className="flex-1 relative">
                     <input
                        type="text"
                        value={searchQuery}
                        onChange={onSearchChange}
                        placeholder="Search in conversation..."
                        className="w-full bg-white/20 placeholder-white/70 text-white rounded-full px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                        autoFocus
                        aria-label="Search in conversation"
                    />
                </div>
            ) : (
                <div className="min-w-0">
                    <h2 className="font-bold text-lg truncate">Chat with Jessica Cowles</h2>
                    <p className="text-sm opacity-80">We're online</p>
                </div>
            )}
        </div>
        <div className="flex items-center space-x-2 pl-2">
            <button onClick={onSearchToggle} className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0046ff] focus:ring-white" aria-label={isSearchOpen ? 'Close search' : 'Search conversation'} aria-expanded={isSearchOpen}>
                {isSearchOpen ? <CloseIcon className="h-6 w-6" /> : <SearchIcon className="h-6 w-6" />}
            </button>
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0046ff] focus:ring-white" aria-label="More options">
                <MoreVertIcon className="h-6 w-6" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0046ff] focus:ring-white" aria-label="Collapse chat">
                <ChevronDownIcon className="h-6 w-6" />
            </button>
        </div>
    </div>
);
