import React, { useState, useEffect } from 'react';

const YearSelector = props => {

  const [yearArray, setYearArray] = useState([]);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const tempArray = [];

    for(let i = 0; i <= 10; i++){
      tempArray.push(year + i);
    }
    setYearArray(tempArray);
  }, [])

  const yearOptions = yearArray.map(year => {
    return <option key={year} value={year}>{year}</option>
  })
  


  return (
    <select name="cardExpYear" id="cardExpYear" onChange={props.onChange} required={props.required} >
      <option>{props.placeholder}</option>
      {yearOptions}
    </select>
  )
}

export default YearSelector