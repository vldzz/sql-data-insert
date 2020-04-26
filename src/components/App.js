import React from 'react';
import '../index.css';
import 'react-spring';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Nav from './Nav.js'
import Sett from './Sett.js'
import toaster from 'toasted-notes';
import Cookies from 'universal-cookie' 
import Particles from 'react-particles-js';
import params, {containerPar, particle_stylePar} from './particle_param'

const cookies = new Cookies();
const particle_params = params

const container = containerPar;
const particle_style = particle_stylePar;

const adminName = "admin";
const userName1 = "vladz", userName2 = "none";

function Workbench(isAdmin){
  return(
    <div>
      <Sett isAdmin={isAdmin} />
    </div>
  );
}
function Main(isAdmin){
  return (

    <div className="container">
      <Nav />
      <Workbench isAdmin={isAdmin}/>
    </div>

  );
}


class App extends React.Component {
  constructor(){
    super();
    
    var cook = cookies.get('secretToken') === adminName || cookies.get('secretToken') === userName1 || cookies.get('secretToken') === userName2 ? true : false;
    var admin = cookies.get('secretToken') === adminName ? true : false;
    this.state = {
      isLogged: cook,
      isAdmin: admin
    }
  }

  
  log = () => {
        var userName = document.getElementsByClassName("inputLog")[0].value;
        
        var tomorrow = new Date();
        tomorrow.setDate(new Date().getDate()+1);

        if(userName === userName1 || userName === userName2){
          cookies.set('secretToken', userName, { path: '/', expires: tomorrow });
         this.setState(
           {isLogged: true,
          isAdmin: false}
         )
       }
       else if(userName === adminName){
          cookies.set('secretToken', userName, { path: '/', expires: tomorrow });
          this.setState(
            {isLogged: true,
            isAdmin: true}
          )
        }
       else{
         toaster.notify("Incorect token")
       }
      
    }

  Login = () =>{
    if(!this.state.isLogged){
      require('./Loginstyle.css');
    }
    return (
      <div style={{zIndex: '10'}}>
        <div className="container" style={container}>
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign In</h3>
                        <div className="d-flex justify-content-end social_icon">
                            <span><i className="fab fa-facebook-square"></i></span>
                            <span><i className="fab fa-google-plus-square"></i></span>
                            <span><i className="fab fa-twitter-square"></i></span>
                        </div>
                    </div>
                    <div className="card-body">
                        
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text input-group-text-Login"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control inputLog userName" placeholder="username" required/>
                                
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Login" className="btn float-right login_btn inputLog" onClick={this.log}/>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <Particles style={particle_style} params={particle_params}/>
      </div>
    )
    }


  render(){
    const logged = (
      <div className="divRoot">
          <Main isAdmin={this.state.isAdmin}/>
      </div>
    );

    return this.state.isLogged ? logged : this.Login();
  }
}

export default App;
