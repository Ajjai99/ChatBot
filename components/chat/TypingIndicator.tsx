
import React from 'react';

export const TypingIndicator: React.FC = () => (
    <div className="flex justify-start mb-4 animate-fade-in">
        <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-bl-none p-4 flex items-center space-x-2">
            <span className="block w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
            <span className="block w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
            <span className="block w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
        </div>
    </div>
);
