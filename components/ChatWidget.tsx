
import React, { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } from 'react';
import { Message } from '../types';
import { initChat, sendMessageToBot } from '../services/geminiService';
import type { Chat } from '@google/genai';
import { ChatHeader } from './chat/ChatHeader';
import { MessageList } from './chat/MessageList';
import { MessageInput } from './chat/MessageInput';
import { EmojiPicker } from './chat/EmojiPicker';
import { AvatarSelectionModal } from './chat/AvatarSelectionModal';

const initialMessage: Message = {
  id: 1,
  sender: 'bot',
  text: "Hi there! Nice to see you 👋 We have a 10% promo code for new customers! Would you like to get one now? 🎁",
  quickReplies: ['Yes, sure!', 'No, thanks.'],
};

const predefinedAvatars = [
    'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    'https://i.pravatar.cc/150?u=a042581f4e29026704a',
    'https://i.pravatar.cc/150?u=a042581f4e29026704b',
    'https://i.pravatar.cc/150?u=a042581f4e29026704c',
];


const ChatWidget: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([initialMessage]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [userAvatar, setUserAvatar] = useState(predefinedAvatars[0]);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const chatRef = useRef<Chat | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isAtBottomRef = useRef(true);

    useEffect(() => {
      chatRef.current = initChat();
    }, []);

    const handleScroll = useCallback(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
            const threshold = 20; 
            isAtBottomRef.current = scrollHeight - scrollTop - clientHeight <= threshold;
        }
    }, []);
    
    useLayoutEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer && isAtBottomRef.current) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, [messages, isTyping]);
    
    const handleSendMessage = useCallback(async (text: string) => {
        if (!text.trim() || !chatRef.current) return;
    
        const userMessage: Message = {
            id: Date.now(),
            sender: 'user',
            text: text,
        };
    
        setMessages(prevMessages => {
            const updatedMessages = prevMessages.map((msg, index) => {
                if (index === prevMessages.length - 1 && msg.quickReplies) {
                    const { quickReplies, ...messageWithoutReplies } = msg;
                    return messageWithoutReplies;
                }
                return msg;
            });
            return [...updatedMessages, userMessage];
        });
    
        const typingTimer = setTimeout(() => {
            setIsTyping(true);
        }, 1200);
    
        const botResponseText = await sendMessageToBot(chatRef.current, text);
    
        clearTimeout(typingTimer);
        setIsTyping(false);
    
        const botMessage: Message = {
            id: Date.now() + 1,
            sender: 'bot',
            text: botResponseText,
        };
    
        setMessages(prev => [...prev, botMessage]);
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(inputValue);
        setInputValue('');
    };
    
    const handleQuickReplyClick = (reply: string) => {
      handleSendMessage(reply);
    };

    const handleAvatarSelect = (avatarUrl: string) => {
        setUserAvatar(avatarUrl);
        setIsAvatarModalOpen(false);
    };

    const handleAttachmentClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const attachmentMessage: Message = {
            id: Date.now(),
            sender: 'user',
            text: '',
            attachment: { name: file.name },
        };
        
        setMessages(prevMessages => {
            const updatedMessages = prevMessages.map((msg, index) => {
                if (index === prevMessages.length - 1 && msg.quickReplies) {
                    const { quickReplies, ...messageWithoutReplies } = msg;
                    return messageWithoutReplies;
                }
                return msg;
            });
            return [...updatedMessages, attachmentMessage];
        });

        setIsTyping(true);
        setTimeout(() => {
            const botMessage: Message = {
                id: Date.now() + 1,
                sender: 'bot',
                text: `Got it! I've received your file: "${file.name}".`,
            };
            setIsTyping(false);
            setMessages(prev => [...prev, botMessage]);
        }, 1500);

        if (e.target) {
            e.target.value = '';
        }
    };
    
    const handleEmojiSelect = (emoji: string) => {
        setInputValue(prev => prev + emoji);
        setIsEmojiPickerOpen(false);
    };

    const handleSearchToggle = () => {
        setIsSearchOpen(prev => !prev);
        setSearchQuery(''); 
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const displayedMessages = useMemo(() => {
        if (!searchQuery.trim()) {
            return messages;
        }
        return messages.filter(msg => 
            msg.text.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [messages, searchQuery]);

    return (
        <div 
            className="w-full max-w-md mx-auto h-[700px] flex flex-col bg-white rounded-2xl shadow-2xl relative overflow-hidden"
            role="application"
            aria-roledescription="Chat widget"
            aria-label="Customer support chat"
        >
             <ChatHeader 
                userAvatar={userAvatar} 
                onAvatarClick={() => setIsAvatarModalOpen(true)}
                isSearchOpen={isSearchOpen}
                onSearchToggle={handleSearchToggle}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
            />
            
            <MessageList
                messages={displayedMessages}
                searchQuery={searchQuery}
                isTyping={isTyping}
                onQuickReplyClick={handleQuickReplyClick}
                scrollContainerRef={scrollContainerRef}
                onScroll={handleScroll}
            />
            
            {isEmojiPickerOpen && (
                <EmojiPicker 
                    onSelect={handleEmojiSelect} 
                    onClose={() => setIsEmojiPickerOpen(false)}
                />
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                aria-hidden="true"
                tabIndex={-1}
            />

            <MessageInput 
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleFormSubmit={handleFormSubmit}
                handleAttachmentClick={handleAttachmentClick}
                isEmojiPickerOpen={isEmojiPickerOpen}
                toggleEmojiPicker={() => setIsEmojiPickerOpen(prev => !prev)}
            />
            
            <AvatarSelectionModal 
                isOpen={isAvatarModalOpen}
                onClose={() => setIsAvatarModalOpen(false)}
                onSelect={handleAvatarSelect}
            />
        </div>
    );
};

export default ChatWidget;
