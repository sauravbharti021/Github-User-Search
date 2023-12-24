import './App.css';
import {Routes, Route} from 'react-router-dom'

import Homepage from './components/pages/home/Homepage';
import './components/pages/home/Homepage.css'
import User from './components/pages/user/User';
function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Homepage/>} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
