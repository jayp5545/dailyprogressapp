'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function CreateLearning() {
  const [content, setContent] = useState('');
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
        content,
        mediaUrl
      },{
        headers: { 'Content-Type': 'application/json' } 
      });

      setContent('');
      setFile(null);
    } catch (error) {
      console.error('Error creating learning:', error);
    }
  };

  return (
    <div className="create-learning">
      <h2>Create New Learning</h2>
      <form className=""onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your learning..."
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="submitbtn" type="submit">Create Learning</button>
      </form>
    </div>
  );
}