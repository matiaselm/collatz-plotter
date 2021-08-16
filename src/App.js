import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

const App = () => {
  const [ans, setAns] = useState([])
  const [count, setCount] = useState(1);
  const [initialNumber, setInitialNumber] = useState('');

  const calculate = (initialNumber, count) => {
    let number = initialNumber
    let numbers = []
    for(let i = 0; i < count; i++){
      initialNumber = parseInt(initialNumber)+1;
      let list = []
      let one = false
      while(one === false) {
        list.push(number);
        if(number % 2 === 0) {
          number = number / 2;
        } else {
          number = number * 3 + 1;
        }
        if(number === 1) one = true
      }
      numbers[i] = list
      console.log(numbers)
      number = initialNumber
    }
    setAns([...numbers])
  }

  const isNumeric = (str) => {
    return /[0-9]/g.test(str);
  }

  const handleValueChange = (e, target) => {
    if(isNumeric(e.target.value)) {
      switch(target) {
        case 'initial': return setInitialNumber(e.target.value);
        case 'count': return setCount(e.target.value);
        default: break
      } 
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(isNumeric(initialNumber)) {
      calculate(initialNumber, count)
    }
  }

  const rainbow = (numOfSteps, step) => {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
        default: break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

  return (
    <div className="App">
      <div id='box'>
        <form onSubmit={handleSubmit}>
          <input placeholder='starting number' type='number' value={initialNumber} onChange={e => handleValueChange(e, 'initial')} />
          <input placeholder='starting number' type='number' value={count} onChange={e => handleValueChange(e, 'count')} />
          <input type="submit" value="Calculate" />
        </form>
      </div>
      <div id='body'>
        <div className='split' id='plot'>
          <Plot data={ans.map(list => {
            let color = rainbow(list.length, initialNumber)
            return {
              y: list,
              x: list.map((value, i) => i),
              type: 'scatter',
              marker: { color: color }
            }
          })}
            layout={{
              title: `Collatz calculator - # values: ${ans[0]?.length}`,
              width: 1000,
              height: 700
            }} />
        </div>
        { ans.map((list, i) => {
          return <div className='split' key={i}>
            <ul id='numbers'>
              {list.map((number, i) => {
                return <li key={i} className='number'>{number}</li>
              })}
            </ul>
          </div>
        })}

      </div>
    </div>
  );
}

export default App;
