import React from 'react';
import '../index.css';
import 'react-spring';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Nav from './Nav.js'
import Sett from './Sett.js'
import './Loginstyle.css';
import toaster from 'toasted-notes';
import Cookies from 'universal-cookie' 

const cookies = new Cookies();

const container = {
  paddingTop: '13%',
  height: '100%',
  alignContent: 'center'
}




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


class App extends React.Component {
  constructor(){
    super();
    
    var cook = cookies.get('secretToken') !== undefined ? true : false;

    this.state = {
      isLogged: cook
    }


  }

  
  log = () => {
        var userName = document.getElementsByClassName("inputLog")[0].value;
        

        if(userName === "vladz"){
          cookies.set('secretToken', userName, { path: '/' });
         this.setState(
           {isLogged: true}
         )
       }
       else{
         toaster.notify("Incorect token")
       }

      // firebase.database().ref('/Users/').on("value", function(snapshot) {
      //   if(snapshot.val()[0] === email && snapshot.val()[1] === password){
      //     console.log("connected")
      //   }
      //   else{
      //     console.log(snapshot.val()[0])
      //     console.log(snapshot.val())
      //     console.log("unconected")
      //   }
      // }, function (errorObject) {
      //   console.log("The read failed: " + errorObject.code);
      // });
      
    }

  Login = () =>{
    return (
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
    )
    }


  render(){
    const logged = (
      <div className="divRoot">
          <Main />
      </div>
    );

    return this.state.isLogged ? logged : this.Login();
  }
}

export default App;
