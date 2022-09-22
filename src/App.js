import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import { useDebugValue } from 'react';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <div className="bg-purple-500">
            <h1 className='text-xl'>Hello World</h1>
          </div>
        }>
        </Route>
        <Route path='/' element={
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <main>Main Content</main>
          </div>
        }>
        </Route>
        <Route path='/' element={
          <h1 className='text-xl'>Hello world</h1>
        }>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
