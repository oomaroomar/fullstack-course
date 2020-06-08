// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDiscriptionfull extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDiscriptionfull {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDiscriptionfull {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartDiscriptionfull {
  name: 'Design thinking';
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

// this is the new coursePart variable

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
