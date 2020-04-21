import React from 'react';
import './Loginstyle.css';
import firebase from 'firebase';
import toaster from 'toasted-notes';


const container = {
    paddingTop: '13%',
    height: '100%',
    alignContent: 'center'
}

function log(){
    var email = document.getElementsByClassName("userName")[0].value;
    var password = document.getElementsByClassName("password")[0].value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        toaster.notify("Connected")
});
}

const Login = (
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
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text input-group-text-Login"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control inputLog password" placeholder="password" required/>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Login" className="btn float-right login_btn inputLog" onClick={log}/>
                            </div>
                    
                    </div>
                </div>
            </div>
        </div>
    )


export default Login;