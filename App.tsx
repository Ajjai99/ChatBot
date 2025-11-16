
import React from 'react';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 font-sans">
      <ChatWidget />
    </div>
  );
};

export default App;
