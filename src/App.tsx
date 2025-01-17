import React, { useState } from 'react';
import { TrixEditor } from './components/TrixEditor';
import { Save } from 'lucide-react';

function App() {
  const [content, setContent] = useState('');

  const handleSave = () => {
    console.log('Saved content:', content);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Rich Text Editor</h1>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Save size={18} />
              Save
            </button>
          </div>
          <div className="p-4">
            <TrixEditor
              onChange={setContent}
              value={content}
              placeholder="Start writing..."
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;