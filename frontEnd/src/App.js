import './App.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import AppRoutes from './AppRoutes';
import { IsSignedInContext, UserIdContext } from './contexts';
import { Suspense, useEffect, useState } from 'react';
import { AuthToken, ValidateUser } from './services/authentication';
import { ApiUrl, apiMethod } from './services/apiServices';
import MainHeader from './components/Header/mainHeader';
import Loading from './components/test/loading';

function App() {
  const token = localStorage.getItem("Healthy-Token")
  const [isSignedIn, setIsSignedIn] = useState(token ? true : false);


  // useEffect(() => { })
  // ValidateUser()


  return (
    <IsSignedInContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <div className="App">
        <AppRoutes />
      </div>
    </IsSignedInContext.Provider>
  );
}

export default App;
