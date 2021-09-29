import React from 'react';
import Swal from 'sweetalert2';

import './register.css';

import { useDispatch, useSelector } from 'react-redux'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'
import { useForm } from '../../hooks/useForm';



import validator from 'validator';
import { removeError, setError } from '../../actions/ui';

export const RegisterScreen = () => {
    
    const dispatch = useDispatch(); //lo necesitamos para agregar el dispath a redux
    const { loading } = useSelector(state => state.ui);
    
    // formuario Register
    const  [formValueRegister, handleInputChangeRegister] = useForm({
        nombreRegister: '',
        emailRegister: '',
        passwordRegister : '',
        passwordRegister2 : ''

    });


    const { nombreRegister, emailRegister, passwordRegister, passwordRegister2 } = formValueRegister;


    const handleRegister = (e) =>{
        e.preventDefault();
        if (isFormValid()){            
            dispatch( startRegisterWithEmailPasswordName(emailRegister, passwordRegister, nombreRegister) );
        }
    }
    //-----------

    const isFormValid = ()=>{
        if (nombreRegister.trim().length <=0){

            const errorNombre = 'Name is Required';
            dispatch( setError(errorNombre));
            Swal.fire('Error', errorNombre, 'error');

            return false;
        }else if (!validator.isEmail(emailRegister)){

            const errorEmail = 'Email is not valid';
            dispatch( setError(errorEmail))
            Swal.fire('Error', errorEmail, 'error');
            return false;
        }else if (passwordRegister !== passwordRegister2 || passwordRegister.length < 5){
            const errorPassword = 'Password should be at least 6 characters and match each other';
            dispatch( setError(errorPassword))
            Swal.fire('Error', errorPassword, 'error');

            return false;
        }
        dispatch (removeError()) // removemos los errores
        return true;
    }

    return (
        <div className="login-page">
        <main>
        <div className="login-block">
                {/* <img src="http://scanfcode.com/wp-content/uploads/2017/09/cropped-Untitled-1.png" alt="Scanfcode" /> */}
                <h1>Log into your account</h1>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user ti-user" /></span>
                            <input type="text" className="form-control" placeholder="Your name" 
                                name="nombreRegister" 
                                value={nombreRegister}
                                onChange={handleInputChangeRegister}
                            
                            />
                        </div>
                    </div>
                    <hr className="hr-xs" />
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-envelope ti-email" /></span>
                            <input type="text" className="form-control" placeholder="Your email address" 
                                name="emailRegister" 
                                value={emailRegister}
                                onChange={handleInputChangeRegister}
                        
                            />
                        </div>
                    </div>
                    <hr className="hr-xs" />
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-lock ti-unlock" /></span>
                            <input type="text" className="form-control" placeholder="Choose a password" autocomplete="off" 
                                name="passwordRegister" 
                                value={passwordRegister}
                                onChange={handleInputChangeRegister}
                            />
                        </div>
                    </div>
                    <hr className="hr-xs" />
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-lock ti-unlock" /></span>
                            <input type="text" className="form-control" placeholder="Confirm password" autocomplete="off" 
                                name="passwordRegister2" 
                                value={passwordRegister2}
                                onChange={handleInputChangeRegister}
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary btn-block" type="submit" disabled={ loading }>Sign up</button>
                    
                </form>
                </div>
                <div className="login-links">
                <p className="text-center">Already have an account? <a className="txt-brand" href="./login">Login</a></p>
                </div>
            </main>

        </div>
        
    )
}
