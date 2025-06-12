'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PromptCardProps {
  id: string;
  title: string;
  content: string;
  category: string;
  tone: string;
  format: string;
  length: string;
  onSave?: () => void;
  isSaved?: boolean;
  isOwner?: boolean;
  onDelete?: () => void;
}

export default function PromptCard({
  id,
  title,
  content,
  category,
  tone,
  format,
  length,
  onSave,
  isSaved = false,
  isOwner = false,
  onDelete,
}: PromptCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this prompt?')) return;
    
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/prompts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete prompt');
      }

      onDelete?.();
    } catch (error) {
      console.error('Error deleting prompt:', error);
      alert('Failed to delete prompt');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <div className="flex space-x-2">
            {isOwner && (
              <>
                <button
                  onClick={() => router.push(`/prompt/edit/${id}`)}
                  className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </>
            )}
            {onSave && (
              <button
                onClick={onSave}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isSaved
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
            )}
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {category}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {tone}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {format}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {length}
          </span>
        </div>

        <div className="mt-4">
          <p
            className={`text-gray-600 ${
              isExpanded ? '' : 'line-clamp-3'
            }`}
          >
            {content}
          </p>
          {content.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
} 