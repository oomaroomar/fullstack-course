type Rating = 1 | 2 | 3;
type RatingDescription =
  | 'You can do better'
  | 'Good job; not perfect'
  | 'Absolutely amazing!';

interface ExerciseResult {
  allDays: number;
  trainingDays: number;
  targetWasReached: boolean;
  rating: Rating;
  ratingDesc: string;
  originalTarget: number;
  average: number;
}

interface cmdlArgs {
  originalTarget: number;
  allDays: Array<number>;
}

const parseArgs = (args: Array<string>): cmdlArgs => {
  const originalTarget = Number(args[2]);
  if (isNaN(originalTarget)) throw new Error(`Faulty input ${args[2]}`);

  const allDays = args.slice(3).map(arg => {
    const day = Number(arg);
    if (isNaN(day)) throw new Error(`Faulty input ${arg}`);
    return day;
  });

  return {
    originalTarget,
    allDays,
  };
};

const ratePerformance = (average: number): Rating => {
  if (average <= 1) return 1;
  if (average <= 2.5) return 2;
  return 3;
};

const getRatingDescription = (rating: Rating): RatingDescription => {
  switch (rating) {
    case 1:
      return 'You can do better';
    case 2:
      return 'Good job; not perfect';
    case 3:
      return 'Absolutely amazing!';
    default:
      throw new Error(
        `There was an error inferring your rating ${String(rating)}`
      );
  }
};

const calculateExercises = (
  originalTarget: number,
  days: Array<number>
): ExerciseResult => {
  const allDays = days.length;
  const trainingDays = days.reduce((tds, day) => (day > 0 ? tds + 1 : tds));
  const average = days.reduce((total, day) => total + day) / days.length;
  const rating = ratePerformance(average);
  const ratingDesc = getRatingDescription(rating);
  const targetWasReached = rating >= originalTarget ? true : false;

  return {
    allDays,
    trainingDays,
    average,
    rating,
    ratingDesc,
    targetWasReached,
    originalTarget,
  };
};

try {
  // NOTE! Not being able to pass ...Object.values(readyArgs) as an argument to calculateExercises triggered me
  // so I did what I had to be done

  const readyArgs = parseArgs(process.argv);

  // Both log the same output so they should both work as calculateExercises' input
  console.log(...Object.values(readyArgs));
  console.log(readyArgs.originalTarget, readyArgs.allDays);

  const result = calculateExercises(
    Object.values(readyArgs)[0],
    Object.values(readyArgs)[1]
  );
  console.log(result);
} catch (error) {
  console.error(error);
}

export { calculateExercises };
