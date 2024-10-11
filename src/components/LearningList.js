'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LearningItem from './LearningItem';

export default function LearningList() {
  const [learnings, setLearnings] = useState([]);

  useEffect(() => {
    fetchLearnings();
  }, []);

  const fetchLearnings = async () => {
    try {
      const response = await axios.get('https://11otjiv9c2.execute-api.us-east-1.amazonaws.com/dev/learnings/getlearnings');
      const data= JSON.parse(response.data.body);
  
      setLearnings(data.learnings);
    } catch (error) {
      console.error('Error fetching learnings:', error);
    }
  };

  const handleDelete = async (learningId, mediaUrl) => {
  
    try {
      const res = await axios.delete('https://11otjiv9c2.execute-api.us-east-1.amazonaws.com/dev/learnings/delete', {
        headers: {
          'Content-Type': 'application/json',
        },data:{
        learningId: learningId 
      }});
      fetchLearnings();
    } catch (error) {
      console.error('Error deleting learning:', error);
    }
  };

  return (
    <div className="learning-list">
      <h2>Learnings</h2>
      {learnings.map(learning => (
        <LearningItem
          key={learning.learningId}
          learning={learning}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}