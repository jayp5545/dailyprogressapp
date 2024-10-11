"use client";

import React from 'react';
import LearningList from '../components/LearningList';
import CreateLearning from '../components/CreateLearning';

export default function Home() {
    return (
        <main>
            <h1>Learning Management</h1>
            <CreateLearning />
            <LearningList />
        </main>
    );
}
