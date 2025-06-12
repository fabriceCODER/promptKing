'use client'

import { useState } from 'react'

interface PromptFormProps {}

const PromptForm: React.FC<PromptFormProps> = () => {
  const [category, setCategory] = useState('Coders');
  const [context, setContext] = useState('');
  const [tone, setTone] = useState('Professional');
  const [format, setFormat] = useState('Paragraph');
  const [length, setLength] = useState('Medium');
  const [result, setResult] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ category, context, tone, format, length }),
    });
    const data = await res.json();
    setResult(data.result);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option>Coders</option>
        <option>Content Creators</option>
        <option>Researchers</option>
      </select>

      <textarea
        placeholder="Describe what you want..."
        className="w-full p-2 border rounded"
        value={context}
        onChange={(e) => setContext(e.target.value)}
        required
      />

      <div className="flex space-x-2">
        <select 
          value={tone} 
          onChange={(e) => setTone(e.target.value)}
          className="p-2 border rounded"
        >
          <option>Professional</option>
          <option>Casual</option>
          <option>Friendly</option>
        </select>
        <select 
          value={format} 
          onChange={(e) => setFormat(e.target.value)}
          className="p-2 border rounded"
        >
          <option>Paragraph</option>
          <option>List</option>
          <option>Table</option>
        </select>
        <select 
          value={length} 
          onChange={(e) => setLength(e.target.value)}
          className="p-2 border rounded"
        >
          <option>Short</option>
          <option>Medium</option>
          <option>Long</option>
        </select>
      </div>

      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Generate Prompt
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 border rounded whitespace-pre-wrap">
          {result}
        </div>
      )}
    </form>
  )
}

export default PromptForm;
