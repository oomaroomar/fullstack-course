import React, { Fragment } from 'react';
import { CoursePart, assertNever } from '../types';

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }: PartProps) => {
  let body;
  switch (part.name) {
    case 'Deeper type usage':
      body = (
        <Fragment>
          <p>Description: {part.description}</p>
          <p>
            Submission link:{' '}
            <a href={part.exerciseSubmissionLink}>
              {part.exerciseSubmissionLink}
            </a>{' '}
          </p>
        </Fragment>
      );
      break;
    case 'Fundamentals':
      body = (
        <Fragment>
          <p>Description: {part.description}</p>
        </Fragment>
      );
      break;
    case 'Using props to pass data':
      body = (
        <Fragment>
          <p>Group project count: {part.groupProjectCount}</p>
        </Fragment>
      );
      break;
    case 'Design thinking':
      body = (
        <Fragment>
          <p>Description: {part.description}</p>
        </Fragment>
      );
      break;
    default:
      assertNever(part);
  }
  return (
    <div>
      <h2>{part.name}</h2>
      <p>exercise count: {part.exerciseCount}</p>
      {body}
    </div>
  );
};

export default Part;
