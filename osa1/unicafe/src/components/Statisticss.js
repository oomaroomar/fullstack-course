import React from 'react'

import Stat from './Statistic'

export default ({goodCount, neutralCount, badCount}) => 
{
    const all = goodCount + neutralCount + badCount
    if(all > 0) return <table>
        <thead>
        <tr>
            <th>statistics</th>
        </tr>
        </thead>
        <tbody>
            <Stat text='good' value={goodCount} />
            <Stat text='neutral' value={neutralCount} />
            <Stat text='bad' value={badCount}/>
            <Stat text='all' value={all}/>
            <Stat text='average' value={(goodCount - badCount)/ all}/>
            <Stat text='positive' value={(100*goodCount/all) + '%'}/>
        </tbody>
    </table>
    
    
    return <h3>No feedback given</h3>
    
}