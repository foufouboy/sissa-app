import { useEffect, useState } from "react";
import "./index.sass";
const env = import.meta.env;

function App() {
  const [count, setCount] = useState(0);
  const token = "Some token";

  useEffect(() => {
    const getDashboard = async () => {
      const response = await fetch(`${env.API_ENDPOINT}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log(data);
    };

    getDashboard();
  }, []);

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
