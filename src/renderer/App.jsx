import React, { useEffect } from 'react';
import Note from '../component/note/Note';
import Button from '@material-ui/core/Button';

const App = () => {

  const handlePing = (e) => {
    e.preventDefault();
    window.appContext.sendPing();
  }

  useEffect(() => {
    window.appContext.onPingReceive(data => alert(data))
  }, []);

  const _fetchNotes = (e) => {
    console.log('click fetch')
    e.preventDefault();
    window.appContext.fetchNotes("asdf");
  }

  return (
    <div>
      <Button onClick={_fetchNotes}>fetch</Button>
      {/* <h1>App Component</h1>
    <button onClick={handlePing}>Ping</button> */}
      <Note></Note>
    </div>
  )
};

export default App;