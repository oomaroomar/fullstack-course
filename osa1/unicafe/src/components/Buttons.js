import React from 'react'


import Button from './Button'


export default ({setGood, setBad, setNeutral}) => {
return <div>
    <Button text='Good' setter={setGood} />
    <Button text='Neutral' setter={setNeutral} />
    <Button text='Bad' setter={setBad} />
</div>}