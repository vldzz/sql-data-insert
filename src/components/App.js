import React from 'react';
import '../index.css';
import 'react-spring';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Nav from './Nav.js'
import Sett from './Sett.js'


function Workbench(){
  return(
    <div>
      <Sett />
    </div>
  );
}

function Main(){
  return (

    <div className="container">
      <Nav />
      <Workbench />
    </div>

  );
}


function App() {
  return (
    <div className="divRoot">
      <Main />
    </div>
  );
}

export default App;
