'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PromptCard from '@/components/PromptCard';

interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  tone: string;
  format: string;
  length: string;
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch(`/api/prompts?category=${params.category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch prompts');
        }
        const data = await response.json();
        setPrompts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load prompts');
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [params.category]);

  const handleSavePrompt = async (promptId: string) => {
    try {
      const response = await fetch(`/api/prompts/${promptId}/save`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to save prompt');
      }
      // Update the UI to reflect the saved state
      setPrompts((prev) =>
        prev.map((p) =>
          p.id === promptId ? { ...p, isSaved: true } : p
        )
      );
    } catch (err) {
      console.error('Error saving prompt:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center capitalize"
      >
        {params.category} Prompts
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            {...prompt}
            onSave={() => handleSavePrompt(prompt.id)}
          />
        ))}
      </div>

      {prompts.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          <p>No prompts found for this category.</p>
        </div>
      )}
    </div>
  );
} 