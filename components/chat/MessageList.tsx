
import React from 'react';
import { Message } from '../../types';
import { MessageBubble } from './MessageBubble';
import { QuickReplyButtons } from './QuickReplyButtons';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
    messages: Message[];
    searchQuery: string;
    isTyping: boolean;
    onQuickReplyClick: (reply: string) => void;
    scrollContainerRef: React.RefObject<HTMLDivElement>;
    onScroll: () => void;
}

export const MessageList: React.FC<MessageListProps> = ({
    messages,
    searchQuery,
    isTyping,
    onQuickReplyClick,
    scrollContainerRef,
    onScroll
}) => {
    return (
        <div
            ref={scrollContainerRef}
            onScroll={onScroll}
            className="flex-1 p-6 overflow-y-auto custom-scrollbar"
            role="log"
            aria-live="polite"
        >
            {messages.length > 0 ? messages.map((msg, index) => (
                <React.Fragment key={msg.id}>
                    <MessageBubble message={msg} searchQuery={searchQuery} />
                    {msg.quickReplies && !searchQuery && index === messages.length - 1 && (
                       <QuickReplyButtons replies={msg.quickReplies} onReplyClick={onQuickReplyClick} />
                    )}
                </React.Fragment>
            )) : (
                <div className="text-center text-gray-500 py-10">
                    <p className="font-semibold">No messages found</p>
                    <p className="text-sm">No messages match your search for "{searchQuery}".</p>
                </div>
            )}
            {isTyping && <TypingIndicator />}
        </div>
    );
};
