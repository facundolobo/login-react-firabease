import React from 'react';
import { Link } from 'react-router-dom';


import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword } from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'

import './login.css';
export const LoginScreen = () => {
    
    const { loading } = useSelector(state => state.ui);
  
    // formuario login
    const dispatch = useDispatch(); //lo necesitamos para agregar el dispath a redux
    const  [formValueLogin, handleInputChangeLogin] = useForm({
      emailLogin: '',
      passwordLogin : ''
    });


    const { emailLogin, passwordLogin } = formValueLogin;


    const handleLogin = (e) =>{
        e.preventDefault();
        dispatch( startLoginEmailPassword(emailLogin, passwordLogin) );
    }
    //-----------  
  
  return (      
        <div className="wrapper fadeInDown">
        <div id="formContent">
          {/* Tabs Titles */}
          {/* Icon */}
          <div className="fadeIn first">
          <h1>Log in</h1>
          </div>
          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <input 
              type="text" 
              className="fadeIn second"
              autoComplete="off" 
              placeholder="correo"
              name="emailLogin" 
              value={ emailLogin } 
              onChange={handleInputChangeLogin} 
            />
            <input 
              type="text" 
              className="fadeIn third" 
              autoComplete="off" 
              placeholder="password"
              name="passwordLogin" 
              value={ passwordLogin } 
              onChange={handleInputChangeLogin} 
            />

            <input type="submit" className="fadeIn fourth" defaultValue="Log In" disabled={ loading } />
          </form>
          {/* Remind Passowrd */}
          <div id="formFooter">
          <p className="text-center">Do not have an account?
                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account    
                </Link></p>
          </div>
        </div>
      </div>
    )
}
