import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import WorkspaceBar from './components/WorkspaceBar';

function App() {
  const [currWS, setCurrWS] = useState(localStorage.getItem('workspaces') ? JSON.parse(localStorage.getItem('workspaces'))[0] : '');
  const [workspaces, setWorkSpaces] = useState(localStorage.getItem('workspaces') ? JSON.parse(localStorage.getItem('workspaces')) : []);

  function createWorkSpace(name) {
    name = name.trim();
    if (name === '') return;

    // Check if the workspace name already exists in localStorage
    if (!localStorage.getItem(name)) {
      // Add the new workspace name to the state
      setWorkSpaces((prev) => [...prev, name]);

      // Store an empty array as a string in localStorage for the workspace name
      localStorage.setItem(name, JSON.stringify([]));
      setCurrWS(name);
    }
  }

  useEffect(() => {
    localStorage.setItem('workspaces', JSON.stringify(workspaces));
  }, [workspaces]);

  useEffect(() => {
    // Log the current workspace or update UI as needed
    
  }, [currWS]);

  return (
    <>
      <div className="flex max-sm:flex-col flex-row">
        <Sidebar createWorkSpace={createWorkSpace} workspaces={workspaces} setCurrWS={setCurrWS} currWS={currWS} />
        <WorkspaceBar currWS={currWS} setCurrWS={setCurrWS} />
      </div>
    </>
  );
}

export default App;
