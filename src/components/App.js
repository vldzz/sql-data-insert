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



/**
 * TODO:
 * 
 * Add dontpad link with data for columns
 * In donpad will be like "data1 data2 data3" 
 * And then with .split(" ")
 * 
 * 
 * 
 * If is more than 5+ columns in list, change css style for height
 * 
 * 
 * 
 * 
 * Copy to clipboard button (fix)
 * 
 */