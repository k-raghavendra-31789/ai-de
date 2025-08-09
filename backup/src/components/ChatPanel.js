import React from 'react';
import { useTheme } from './ThemeContext';
import CustomScrollbar from './CustomScrollbar';

const ChatPanel = ({ chatInput, setChatInput, width }) => {
  const { colors } = useTheme();
  
  const handleSendMessage = () => {
    if (chatInput.trim()) {
      // Handle message sending logic here
      console.log('Sending message:', chatInput);
      setChatInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div 
      className={`${colors.secondary} ${colors.border} border-l flex flex-col h-full`}
      style={{ width }}
    >
      {/* Chat Header */}
      <div className={`p-4 ${colors.border} border-b`}>
        <h3 className={`text-sm font-medium ${colors.text}`}>CHAT</h3>
      </div>

      {/* Chat Messages */}
      <CustomScrollbar 
        className="flex-1"
        showHorizontal={false}
        showVertical={true}
      >
        <div className="p-4">
          <div className={`${colors.tertiary} rounded-lg p-4 mb-4`}>
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
              ○
            </div>
            <div>
              <div className={`font-semibold ${colors.text}`}>Edit with AI-DE</div>
              <div className={`text-sm ${colors.textMuted}`}>Agent Mode</div>
            </div>
          </div>
          <div className={`text-sm ${colors.textSecondary}`}>
                       Write SQL with AI using Mapping Document
                       </div>
        </div>
        </div>
      </CustomScrollbar>

      {/* Chat Input */}
      <div className={`p-4 ${colors.border} border-t`}>
        <div className={`${colors.tertiary} rounded-lg p-2`}>
          {/* <div className={`text-xs ${colors.textMuted} mb-2`}>
            Edit files in your workspace in agent mode
          </div> */}
          <div className="flex items-center space-x-2 mb-2">
            <select className={`${colors.quaternary} text-xs px-2 py-1 rounded ${colors.text}`}>
              <option>Agent</option>
            </select>
            <select className={`${colors.quaternary} text-xs px-2 py-1 rounded ${colors.text}`}>
              <option>Claude Sonnet 3.5</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Attach the Mapping Document using '@DocumentName'"
              className={`flex-1 bg-transparent text-sm focus:outline-none ${colors.text}`}
            />
            <button 
              onClick={handleSendMessage}
              className={`p-1 hover:${colors.quaternary} rounded ${colors.accent} ml-2`}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
