import React, {Fragment} from 'react';

import Part1 from './content/part1'
import Part2 from './content/part2'
import Part3 from './content/part3'

export default ({parts}) => 
<>
    <Part1 part1={parts[0].name} exercises1={parts[0].excercises} />
    <Part2 part2={parts[1].name} exercises2={parts[1].excercises}/>
    <Part3 part3={parts[2].name} exercises3={parts[2].excercises}/>
</>