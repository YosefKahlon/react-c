import { useEffect, useState } from "react";


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
        <div>
            <p> Count: {count}</p>
            <label>
                Step:
                <input type="number" value={step} onChange={e => setStep(Number(e.target.value)|| 0)}
                style={{width: "4rem", marginLeft: "0.5rem"}}
                />
            </label>
            <div style={{marginTop: "0.5rem"}}>
                <button onClick={()=> setCount((c) => c + step)}> Add Step</button>
                <button onClick={()=> setRunning(r => !r)} style={{marginLeft: "0.5rem"}}>
                    {running ? "Stop" : "Start"}
                </button>
                <button onClick={()=> setCount(0)} style={{marginLeft: "0.5rem"}}> Reset</button>
            </div>
            
            <button onClick={()=> setCount(c=>c+1)}> Add 1</button>
        </div>
    );
}
export default CounterWithEffect;