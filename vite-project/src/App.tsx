import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [versionData, setVersionData] = useState<any>(null);
  
  // response.blob()
  // response.text()
  // response.bytes()
  // response.formData()
  // response.json()
  
  const sendToProxy = async () => {
    try {
      const url = '/api/version'; // Используем proxy путь
      const response = await fetch(url);
      response.headers.get("Content-Type")
      // -----?????
      const result = await response.json();
      // -----?????
      console.log(result);
      setVersionData(result);
    } catch (error) {
      console.error('Error fetching version:', error);
      setVersionData({ error: 'Failed to fetch version' });
    }
  };

  useEffect(() => {
    sendToProxy();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Nginx in Docker</h1>
      
      {/* Отображение данных версии */}
      <div className="card">
        <h3>Version Data:</h3>
        <div style={{ textAlign: 'left', background: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
          <pre>{JSON.stringify(versionData, null, 2)}</pre>
        </div>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
