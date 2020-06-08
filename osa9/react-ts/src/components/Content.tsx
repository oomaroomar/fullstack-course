import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

interface ContentProps {
  content: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = ({ content }: ContentProps) => {
  return (
    <div>
      {content.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;
