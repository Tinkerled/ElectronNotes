import React, { useEffect } from 'react';
import Note from '../component/note/Note';

const App = () => {
  const handlePing = (e) => {
    e.preventDefault();
    window.appContext.sendPing();
  }
  
  useEffect(() => {
    window.appContext.onPingReceive(data => alert(data))
  }, []);

  return (
    <div>
    {/* <h1>App Component</h1>
    <button onClick={handlePing}>Ping</button> */}
    <Note></Note>
    </div>
  )
};

export default App;