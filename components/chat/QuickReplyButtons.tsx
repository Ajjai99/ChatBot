
import React from 'react';

interface QuickReplyButtonsProps {
  replies: string[];
  onReplyClick: (reply: string) => void;
}

export const QuickReplyButtons: React.FC<QuickReplyButtonsProps> = ({ replies, onReplyClick }) => (
    <div className="flex justify-end space-x-2 my-2 animate-fade-in">
        {replies.map((reply, index) => (
            <button
                key={index}
                onClick={() => onReplyClick(reply)}
                className="px-4 py-2 text-sm font-semibold rounded-full border border-[#0046ff] text-[#0046ff] bg-white hover:bg-blue-50 transition-colors"
            >
                {reply}
            </button>
        ))}
    </div>
);
