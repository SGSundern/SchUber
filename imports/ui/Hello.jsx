import React, { useState } from "react";

export const Hello = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <button onClick={increment}>Cookie Clicker</button>
      <p>
        Hier kansnt du testen, wie React funktioniert: {counter} mal geklickt.
      </p>
    </div>
  );
};
