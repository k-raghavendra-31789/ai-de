import React from 'react';
import { useTheme } from './ThemeContext';
import { useAppState } from '../contexts/AppStateContext';
import CustomScrollbar from './CustomScrollbar';

const ChatPanel = ({ width }) => {
  const { colors } = useTheme();
  const { state, actions } = useAppState();
  
  const { chatInput, selectedLLM, availableFiles, openTabs, excelFiles } = state;
  const { setChatInput, setSelectedLLM } = actions;
  
  const handleSendMessage = () => {
    if (chatInput.trim()) {
      // Handle message sending logic here
      console.log('Sending message:', chatInput);
      setChatInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e) => {
    setChatInput(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    const newHeight = Math.min(Math.max(textarea.scrollHeight, 36), 150);
    textarea.style.height = newHeight + 'px';
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
        <div className="p-4 h-full flex items-center justify-center">
          {/* Placeholder when no messages */}
          <div className="text-center max-w-md">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${colors.tertiary}`}>
              <svg className={`w-8 h-8 ${colors.textMuted}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold ${colors.text} mb-2`}>
              AI-Powered Development Assistant
            </h3>
            <p className={`text-sm ${colors.textMuted} leading-relaxed mb-4`}>
              Upload files, analyze Excel data, manage folders, and get AI assistance for your development tasks. 
              Use @DocumentName to reference uploaded files in your conversations.
            </p>
            <div className={`text-xs ${colors.textSecondary} space-y-1`}>
              <div>• Excel file analysis and visualization</div>
              <div>• File and folder management with persistence</div>
              <div>• Code generation and documentation</div>
              <div>• Multi-model AI assistance</div>
            </div>
          </div>
        </div>
      </CustomScrollbar>

      {/* Chat Input */}
      <div className={`p-4 ${colors.border} border-t`}>
        <div className={`${colors.tertiary} rounded-lg p-3`}>
          <div className="flex flex-col">
            {/* Textarea - Full width */}
            <textarea
              value={chatInput}
              onChange={handleTextareaChange}
              onKeyPress={handleKeyPress}
              placeholder="Attach the Mapping Document using '@DocumentName'"
              className={`w-full bg-transparent text-sm focus:outline-none ${colors.text} resize-none border-none p-2 leading-relaxed`}
              style={{ 
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                minHeight: '36px',
                maxHeight: '150px',
                overflow: 'auto'
              }}
              rows="1"
            />
            
            {/* Bottom controls - Agent on left, Send on right */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-opacity-20" style={{ borderColor: colors.border }}>
              {/* Left side - LLM Selector */}
              <div className="flex items-center space-x-2">
                <span className={`text-xs ${colors.textMuted}`}>Model:</span>
                <select 
                  value={selectedLLM}
                  onChange={(e) => setSelectedLLM(e.target.value)}
                  className={`${colors.quaternary} text-xs px-2 py-1 rounded ${colors.text} min-w-[140px] border border-opacity-30`}
                  style={{ borderColor: colors.border }}
                >
                  <option value="claude-3-5-sonnet">Claude Sonnet 3.5</option>
                  <option value="claude-3-opus">Claude Opus 3</option>
                  <option value="claude-3-haiku">Claude Haiku 3</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="gemini-pro">Gemini Pro</option>
                  <option value="gemini-ultra">Gemini Ultra</option>
                  <option value="llama-2-70b">Llama 2 70B</option>
                  <option value="codellama-34b">CodeLlama 34B</option>
                  <option value="mistral-large">Mistral Large</option>
                  <option value="mixtral-8x7b">Mixtral 8x7B</option>
                </select>
              </div>
              
              {/* Right side - Send button */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim()}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    chatInput.trim() 
                      ? `${colors.accent} hover:opacity-80 text-white` 
                      : `${colors.quaternary} ${colors.textMuted} cursor-not-allowed`
                  }`}
                >
                  Send ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
