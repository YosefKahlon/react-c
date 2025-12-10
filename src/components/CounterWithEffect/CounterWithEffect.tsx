import { useEffect, useState } from "react";
import "./CounterWithEffect.css";


function CounterWithEffect() {
  const [count, setCount] = useState(0);
  const [ step, setStep ] = useState(1);
  const [running, setRunning] = useState(false);


  useEffect(() => {
    let id: number| undefined;
    if (running) {
        id = window.setInterval(() => {
            setCount(c => c + step);
        }, 1000);
    }
    return () => {
        if (id) {
            clearInterval(id);
        }
    };
  }, [running, step]);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);


    return (
        <div className="counter-container">
            <p className="counter-display">Count: {count}</p>
            <label className="step-label">
                Step:
                <input 
                    type="number" 
                    value={step} 
                    onChange={e => setStep(Number(e.target.value) || 0)}
                    className="step-input"
                />
            </label>
            <div className="button-group">
                <button onClick={() => setCount(c => c + step)}>Add Step</button>
                <button onClick={() => setRunning(r => !r)}>
                    {running ? "Stop" : "Start"}
                </button>
                <button onClick={() => setCount(0)}>Reset</button>
            </div>
            <button onClick={() => setCount(c => c + 1)}>Add 1</button>
        </div>
    );
}
export default CounterWithEffect;