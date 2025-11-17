
import React from 'react';
import { EmojiIcon, AttachmentIcon, SendIcon } from '../icons';

interface MessageInputProps {
    inputValue: string;
    setInputValue: (value: string) => void;
    handleFormSubmit: (e: React.FormEvent) => void;
    handleAttachmentClick: () => void;
    isEmojiPickerOpen: boolean;
    toggleEmojiPicker: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
    inputValue,
    setInputValue,
    handleFormSubmit,
    handleAttachmentClick,
    isEmojiPickerOpen,
    toggleEmojiPicker
}) => {
    return (
        <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
                <button
                    type="button"
                    onClick={toggleEmojiPicker}
                    className="p-2 text-gray-500 hover:text-[#0046ff] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0046ff]"
                    aria-label="Open emoji picker"
                    aria-haspopup="dialog"
                    aria-expanded={isEmojiPickerOpen}
                    aria-controls="emoji-picker"
                >
                    <EmojiIcon className="w-6 h-6" />
                </button>
                <button type="button" onClick={handleAttachmentClick} className="p-2 text-gray-500 hover:text-[#0046ff] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0046ff]" aria-label="Attach a file">
                    <AttachmentIcon className="w-6 h-6" />
                </button>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your message..."
                    className="flex-1 px-4 py-2 text-sm bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-[#0046ff] transition-all"
                    aria-label="Message input"
                />
                <button type="submit" className="p-3 bg-[#0046ff] text-white rounded-full hover:bg-blue-700 disabled:bg-blue-300 transition-colors transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0046ff]" disabled={!inputValue.trim()} aria-label="Send message">
                    <SendIcon className="w-6 h-6" />
                </button>
            </form>
        </div>
    );
};
