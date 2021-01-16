import { useState, Button } from "react";

function App() {
  let [val, setVal] = useState(0);
  let [flag, setFlag] = useState(1);
  return (
    <div>
      <h1>Value is {val}</h1>
      <>
        <button
          onClick={() => {
            setFlag(flag === 1 ? (val > 8 ? 0 : 1) : val < 2 ? 1 : 0);
            setVal(flag === 1 ? val + 1 : val - 1);
          }}
        >
          {flag === 1 ? "Increase" : "Decrease"}
        </button>
      </>
    </div>
  );
}

export default App;
