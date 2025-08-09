import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import FileExplorer from './components/FileExplorer';
import MainEditor from './components/MainEditor';
import ChatPanel from './components/ChatPanel';
import TerminalPanel from './components/TerminalPanel';
import ResizeHandle from './components/ResizeHandle';
import { useResizable } from './components/useResizable';

const VSCodeInterface = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const { theme, colors } = useTheme();
  
  const {
    containerRef,
    leftPanelWidth,
    rightPanelWidth,
    bottomPanelHeight,
    isTerminalVisible,
    handleLeftMouseDown,
    handleRightMouseDown,
    handleBottomMouseDown,
    toggleTerminal,
  } = useResizable();

  const handleFileOpen = (fileName) => {
    // Update the selected file when a file is opened via drag and drop
    setSelectedFile(fileName);
  };

  // Add a callback to handle file renames from FileExplorer
  const mainEditorRef = useRef(null);
  
  const handleFileRenamed = (oldName, newName, fileHandle) => {
    if (mainEditorRef.current && mainEditorRef.current.handleFileRenamed) {
      mainEditorRef.current.handleFileRenamed(oldName, newName, fileHandle);
    }
  };

  const handleFileDeleted = (fileName) => {
    if (mainEditorRef.current && mainEditorRef.current.handleFileDeleted) {
      mainEditorRef.current.handleFileDeleted(fileName);
    }
  };

  // Add keyboard shortcut for terminal toggle (Ctrl+` like VS Code)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        toggleTerminal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleTerminal]);

  return (
    <div 
      ref={containerRef}
      className={`h-screen ${colors.text} flex ${colors.primary} overflow-hidden ${theme}`}
      style={{ height: '100vh', maxHeight: '100vh' }}
    >
      {/* Left FileExplorer - fixed */}
      <FileExplorer 
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        width={leftPanelWidth}
        onFileRenamed={handleFileRenamed}
        onFileDeleted={handleFileDeleted}
      />
      
      <ResizeHandle onMouseDown={handleLeftMouseDown} orientation="vertical" />
      
      {/* Right side - MainEditor/ChatPanel above, Terminal below */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top section - MainEditor and ChatPanel */}
        <div 
          className="flex overflow-hidden"
          style={{ height: bottomPanelHeight === 0 ? '100%' : `calc(100vh - ${bottomPanelHeight}px - 1px)` }}
        >
          <div className="flex-1 overflow-hidden">
            <MainEditor 
              selectedFile={selectedFile} 
              onFileOpen={handleFileOpen}
              ref={mainEditorRef}
              isTerminalVisible={isTerminalVisible}
            />
          </div>
          
          <ResizeHandle onMouseDown={handleRightMouseDown} orientation="vertical" />
          
          <div style={{ width: rightPanelWidth }} className="flex-shrink-0 overflow-hidden h-full">
            <ChatPanel 
              chatInput={chatInput}
              setChatInput={setChatInput}
              width={rightPanelWidth}
            />
          </div>
        </div>
        
        {/* Show terminal controls */}
        {isTerminalVisible && (
          <>
            {/* Horizontal resize handle */}
            <ResizeHandle onMouseDown={handleBottomMouseDown} orientation="horizontal" />
            
            {/* Bottom Terminal panel - spans full width of right side */}
            <TerminalPanel 
              height={bottomPanelHeight} 
              isVisible={isTerminalVisible}
              onToggle={toggleTerminal}
            />
          </>
        )}
        
        {/* Terminal toggle button when hidden */}
        {!isTerminalVisible && (
          <div className={`${colors.secondary} ${colors.border} border-t flex items-center justify-between px-3 py-1`}>
            <span className={`text-xs ${colors.textSecondary}`}>Terminal</span>
            <button
              onClick={toggleTerminal}
              className={`p-1 rounded text-xs ${colors.textSecondary} hover:${colors.text} hover:bg-gray-600`}
              title="Open terminal"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 4.75A.75.75 0 0 1 2.75 4h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75zM2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8zm0 3.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75z"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <VSCodeInterface />
    </ThemeProvider>
  );
}

