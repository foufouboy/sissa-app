import { useState } from "react";
import "./index.sass";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>Hello World</h1>
        <p>This is a paragraph</p>
      </div>
    </>
  );
}

export default App;
