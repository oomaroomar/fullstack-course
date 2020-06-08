type Category =
  | 'Very severely underweight'
  | 'Severely underweight'
  | 'Underweight'
  | 'Normal (healthy weight)'
  | 'Overweight'
  | 'Obese Class I (Moderately obese)'
  | 'Obese Class II (Severly obese)'
  | 'Obese Class III (Very severly obese)';

interface BmiResult {
  bmi: number;
  category: Category;
}

interface parsedArgs {
  height: number;
  weight: number;
}

const parseBmiArgs = (args: string[]): parsedArgs => {
  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (Object.is(height, NaN) || Object.is(weight, NaN))
    throw new Error(`Faulty inputs height: ${height}, weight: ${weight}`);
  return {
    height,
    weight,
  };
};

const bmiCalc = (height: number, weight: number): BmiResult => {
  if (weight === 0 || height === 0) throw new Error('Inhuman measurements');
  // Calculate bmi
  const bmi = weight / ((height / 100) * (height / 100));
  let category: Category = 'Very severely underweight';
  if (bmi >= 15) category = 'Severely underweight';
  if (bmi >= 16) category = 'Underweight';
  if (bmi >= 20) category = 'Normal (healthy weight)';
  if (bmi >= 25) category = 'Overweight';
  if (bmi >= 30) category = 'Obese Class I (Moderately obese)';
  if (bmi >= 35) category = 'Obese Class II (Severly obese)';
  if (bmi >= 40) category = 'Obese Class III (Very severly obese)';
  return {
    bmi,
    category,
  };
};

// For just the category add .category see interface Result

try {
  const args = Object.values(parseBmiArgs(process.argv));
  console.log(bmiCalc(args[0], args[1]));
} catch (err) {
  console.error(err);
}

export { bmiCalc };
