import classes from '../SignInForm/SignInForm.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((previousFormData) => ({
            ...previousFormData,
            [name]: value,
        }));
    }

    return (
        <div className={`${classes.formContainer}`}>
            <p className={`${classes.signUp}`}>Sign Up</p>
            <form action='#' method='post'>
                <div className={`${classes.inputContainer}`}>
                    <p>First Name</p>
                    <input type='text' id='firstName' name='first_name' onChange={handleChange} maxLength={20} required/>
                </div>
                <div className={`${classes.inputContainer}`}>
                    <p>Last Name</p>
                    <input type='text' id='lastName' name='last_name' onChange={handleChange} maxLength={20} required/>
                </div>
                <div className={`${classes.inputContainer}`}>
                    <p>Email</p>
                    <input type='email' id='email' name='email' onChange={handleChange} required/>
                </div>
                <div className={`${classes.inputContainer}`}>
                    <p>Password</p>
                    <input type='password' id='password' name='password' onChange={handleChange} maxLength={128} minLength={5} required/>
                </div>
                <button className={`${classes.submitButton}`} type='submit'>Create Account</button>
                <p>Or <Link to='/login'>log in</Link>.</p>
            </form>
        </div>
    );
}

export default RegisterForm;