'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function CreateLearning() {
  const [learning, setLearning] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let mediaUrl = null;
      if (file) {
        try {
        const uploadResponse = await axios.post('https://11otjiv9c2.execute-api.us-east-1.amazonaws.com/dev/learnings/upload', {
          fileName: file.name,
          fileType: file.type
        });
        const parsedBody = JSON.parse(uploadResponse.data.body);
        const uploadUrl = parsedBody.uploadUrl;
            await axios.put(uploadUrl, file, {
              headers: { 'Content-Type': file.type }
            });
          
            console.log('File uploaded successfully');
          } catch (error) {
            console.log(error)
          }
          
        mediaUrl = `https://jy432150learningsbucket.s3.amazonaws.com/${file.name}`;
      }

      await axios.post('https://11otjiv9c2.execute-api.us-east-1.amazonaws.com/dev/learnings', {
        learning,
        mediaUrl
      },{
        headers: { 'Content-Type': 'application/json' } 
      });

      setLearning('');
      setFile(null);
    } catch (error) {
      console.error('Error creating learning:', error);
    }
  };

  return (
    <div className="create-learning">
      <h2>Create New Learning</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={learning}
          onChange={(e) => setLearning(e.target.value)}
          placeholder="Enter your learning..."
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Create Learning</button>
      </form>
    </div>
  );
}