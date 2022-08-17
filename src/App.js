import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/Login';
import Main from './pages/Main';


function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
