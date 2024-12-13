import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

interface CodeTableProps {
  code: string;
}

export function CodeTable({ code }: CodeTableProps) {
  const [width, setWidth] = useState(800);
  const [fontSize, setFontSize] = useState(14); // Default font size
  const [isBold, setIsBold] = useState(false); // Bold text state

  const increaseFontSize = () => {
    setFontSize((prev) => prev + 2); // Increase font size by 2px
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 8)); // Decrease font size by 2px, minimum 8px
  };

  const toggleBold = () => {
    setIsBold((prev) => !prev); // Toggle bold state
  };

  const copyTableToClipboard = () => {
    const table = document.getElementById('code-table');
    if (table) {
      const range = document.createRange();
      range.selectNode(table);
      window.getSelection()?.removeAllRanges(); // Clear current selection
      window.getSelection()?.addRange(range); // Select the table
      document.execCommand('copy'); // Copy the selected content
      window.getSelection()?.removeAllRanges(); // Clear selection after copying
      alert('Table copied to clipboard!'); // Optional: alert user
    }
  };

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <button onClick={increaseFontSize} className="px-2 py-1 border rounded">
          Increase Font Size
        </button>
        <button onClick={decreaseFontSize} className="px-2 py-1 border rounded">
          Decrease Font Size
        </button>
        <button onClick={toggleBold} className="px-2 py-1 border rounded">
          {isBold ? 'Remove Bold' : 'Make Bold'}
        </button>
        <button onClick={copyTableToClipboard} className="px-2 py-1 border rounded">
          Copy Table
        </button>
      </div>
      <ResizableBox
        width={width}
        height={500}
        minConstraints={[300, 200]}
        maxConstraints={[1200, 800]}
        onResize={(e, { size }) => {
          setWidth(size.width);
        }}
        className="relative border border-border rounded-lg overflow-hidden"
      >
        <div className="w-full h-full overflow-auto">
          <table id="code-table" className="w-auto border-collapse border border-gray-300">
            <tbody>
              <Highlight theme={themes.github} code={code} language="java">
                {({ tokens, getLineProps, getTokenProps }) => (
                  <>
                    {tokens.map((line, i) => (
                      <tr key={i} {...getLineProps({ line })} className="border-b border-gray-300">
                        <td className="border-r border-gray-300 px-4 py-1 text-sm text-muted-foreground select-none text-right w-[50px]">
                          {i + 1}
                        </td>
                        <td
                          className={`px-4 py-1 font-mono whitespace-pre border-r border-gray-300`}
                          style={{ fontSize: `${fontSize}px`, fontWeight: isBold ? '700' : 'normal' }}
                        >
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </Highlight>
            </tbody>
          </table>
        </div>
      </ResizableBox>
    </div>
  );
}