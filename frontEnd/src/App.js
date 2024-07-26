import './App.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import AppRoutes from './AppRoutes';
import { IsSignedInContext } from './contexts';
import { useState } from 'react';

function App() {
  const token = localStorage.getItem("Healthy-Token")
  const [isSignedIn, setIsSignedIn] = useState(token ? true : false);



  return (
    <IsSignedInContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <div className="App">
        <AppRoutes />
      </div>
    </IsSignedInContext.Provider>
  );
}

export default App;
