
import React from 'react';
import { Message } from '../../types';
import { AttachmentIcon } from '../icons';

const HighlightedText: React.FC<{text: string; highlight: string}> = ({ text, highlight }) => {
    if (!highlight.trim()) {
        return <>{text}</>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <mark key={i} className="bg-yellow-300 text-black rounded-sm px-0.5">
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </>
    );
};


interface MessageBubbleProps {
  message: Message;
  searchQuery?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, searchQuery }) => {
    const isBot = message.sender === 'bot';
    return (
        <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${isBot ? 'bg-gray-200 text-gray-800 rounded-bl-none' : 'bg-[#0046ff] text-white rounded-br-none'}`}>
                {message.attachment ? (
                     <div className="flex items-center space-x-2">
                        <AttachmentIcon className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm truncate font-medium">{message.attachment.name}</span>
                    </div>
                ) : (
                    <p className="text-sm break-words">
                        <HighlightedText text={message.text} highlight={searchQuery || ''} />
                    </p>
                )}
            </div>
        </div>
    );
};
