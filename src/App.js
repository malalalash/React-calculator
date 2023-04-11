import './index.css'
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
const valueBtns = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]

function App() {
  const [result, setResult] = useState([]);
  const [prevValue, setPrevValue] = useState(0);
  const [dot, setDot] = useState(false);
  const [operator, setOpertarot] = useState('');

  useEffect(() => {
    if (result.includes('.')) {
      setDot(true)
    }
  }, [result])

  const handleNumberClick = (e) => {
    if (result[0] === '0' && e.target.innerText === '0') {
      return
    } else {
      setResult([...result, e.target.innerText]);
    }
  }

  const handleDefault = () => {
    setResult([]);
    setDot(false);
    setPrevValue(0);
    setOpertarot('');
  }

  const handleBackspace = () => {
    if (result.length === 0) {
      return;
    } else {
      const newResult = result.slice(0, -1);
      if (newResult.includes('.')) {
        setResult(newResult);
      } else {
        setDot(false)
        setResult(newResult);
      }
    }
  }

  const handleDot = (e) => {
    if (result.length === 0) {
      return;
    } else if (!dot) {
      setDot(true);
      setResult([...result, e.target.innerText]);
    }
  }

  const handleOperation = (e) => {
    const first = +''.concat(...result)
    setOpertarot(e.target.innerText);
    setPrevValue(first);
    setResult([])
    setDot(false)
  }

  const calculate = (e) => {
    if (result.length === 0) {
      return
    } else {
      const second = +''.concat(...result)
      switch (operator) {

        case '×':
          const equation = prevValue * second
          setResult(Array.from(equation.toString()));
          setOpertarot('');
          if (result.includes('.')) {
            setDot(true)
          }
          break;

        case '÷':
          const division = prevValue / second;
          setResult(Array.from(division.toString()));
          setOpertarot('');
          if (result.includes('.')) {
            setDot(true)
          }
          break;

        case '+':
          const addition = prevValue + second;
          setResult(Array.from(addition.toString()));
          setOpertarot('');
          break;

        case '-':
          const subtraction = prevValue - second;
          setResult(Array.from(subtraction.toString()));
          setOpertarot('');
          break;

        default:
          return;
      }
    }
  }

  return (
    <div className='wrapper'>
      <div className='container'>
        <div className='screen'>
          <span className='prev'>{prevValue} {operator}</span>
          <span className='curr'>{result.length === 0 ? '0' : result}</span>
        </div>
        <div>
          <div className='btns-wrapper'>
            <button onClick={handleDefault}>C</button>
            <button onClick={handleBackspace}>CE</button>
            <button onClick={handleOperation}>&times;</button>
            <button onClick={handleOperation}>&divide;</button>
            <button onClick={calculate} className='equals'>=</button>
            <button onClick={handleOperation} className='plus'>+</button>
            <div className='number-btns-container'>
              {valueBtns.map((btn, value) =>
                <button key={value} className='' onClick={handleNumberClick}>{btn}</button>)}
              <button onClick={handleDot}>.</button>
              <button onClick={handleOperation} className=''>-</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
