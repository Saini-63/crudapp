import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';

import Navbar from './components/Navbar';
import Homeuser from "./components/Homeuser";
import Register from './components/Register';
import Edit from './components/Edit';
import Detail from './components/Detail';
import {Routes, Route} from 'react-router-dom';


function App() {
  return (
    
    <div className="App">
    
      <Navbar />
      <Routes>
        <Route path="/" element={<Homeuser/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/edit/:id" element={<Edit />}/>
        <Route path="/detail/:name" element={<Detail/>}/>
      </Routes>
      
  
    </div>
    
  );
}

export default App;
