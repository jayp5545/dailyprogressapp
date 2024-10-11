import React from 'react';

export default function LearningItem({ learning, onDelete }) {
  return (
    <div className="learning-item">
      <p>{learning.content}</p>
      {learning.mediaUrl && (
        <img src={learning.mediaUrl} className="h-50" />
      )}
      <button onClick={() => onDelete(learning.learningId, learning.mediaUrl)}>
        Delete
      </button>
    </div>
  );
}