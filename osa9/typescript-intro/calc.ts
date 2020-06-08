import { Operation, isOperation } from './Operation';
type CalcResult = number;

interface Values {
  value1: number;
  value2: number;
  operation: Operation;
}

const parseArgs = (args: Array<string>): Values => {
  if (args.length > 5) throw new Error('Too many arguments');
  if (args.length < 4) throw new Error('Too many arguments');
  const op = isOperation(args[4]) ? args[4] : 'multiply';

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
      operation: op,
    };
  }
  throw new Error('Faulty inputs');
};

const calculator = (a: number, b: number, op: Operation): CalcResult => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    default:
      throw new Error(`Operation ${op} not recognized`);
  }
};

try {
  const { value1, value2, operation } = parseArgs(process.argv);
  console.log(calculator(value1, value2, operation));
} catch (err) {
  console.log('Something went wrong', err.message);
}
