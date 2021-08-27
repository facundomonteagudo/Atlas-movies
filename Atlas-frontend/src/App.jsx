import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeAni, setAnibg] = useState(true);

  return (
    <div>
      <div className={`bg ${activeAnibg ? 'bg-animation' : ''}`} />
    </div>
  );
}

export default App;
