import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

const App = () => {
  const [ans, setAns] = useState({loops: null, numbers: []})
  const [initialNumber, setInitialNumber] = useState('');
  const [length, setLength] = useState([]);

  const calculate = (initialNumber) => {
    let number = initialNumber;
    let numbers = [];
    let one = false;
    while(true) {
      numbers.push(number);
      if(number % 2 === 0) {
        number = number / 2;
      } else {
        number = number * 3 + 1;
      }
      if(one) break;
      one = number === 1;
    }
    setAns({ numbers: numbers })
    let axis = []
    for(let i = 0; i < numbers.length; i++) {
      axis.push(i)
    }
    setLength(axis)
  }

  const isNumeric = (str) => {
    return /[0-9]/g.test(str);
  }

  const handleValueChange = e => {
    if(isNumeric(e.target.value)) {
      console.log(e.target.value)
      setInitialNumber(e.target.value)
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(isNumeric(initialNumber)) {
      calculate(initialNumber)
    }
  }

  return (
    <div className="App">
      <div id='box'>
        <form onSubmit={handleSubmit}>
          <input placeholder='starting number' type='number' value={initialNumber} onChange={handleValueChange} />
          <input type="submit" value="Calculate" />
        </form>
      </div>
      <div id='body'>
        <div className='split' id='plot'>
          <Plot data={[
            {
              x: length,
              y: ans.numbers,
              type: 'scatter',
              mode: 'number+delta',
            },
          ]}
            layout={{
              title: `Collatz calculator - # values: ${ans.numbers.length}`,
              width: 1000,
              height: 700
            }} />
        </div>
        <div className='split'>
          <ul id='numbers'>
            {ans.numbers.map((number, i) => {
              return <li key={i} className='number'>{number}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
