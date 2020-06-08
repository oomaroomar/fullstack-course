const stringLitArray = <L extends string>(arr: L[]) => arr;
const operation = stringLitArray(['multiply', 'add', 'divide']);
type Operation = typeof operation[number];
const isOperation = (tbd: any): tbd is Operation => operation.includes(tbd);

export { Operation, isOperation };
