import classes from './SignInForm.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function SignInForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((previousFormData) => ({
            ...previousFormData,
            [name]: value,
        }));

        console.log(formData);
    }

    return (
        <div className={`${classes.formContainer}`}>
            <p className={`${classes.signIn}`}>Sign in</p>
            <form action='#' method='post'>
                <div className={`${classes.inputContainer}`}>
                    <p>Email</p>
                    <input type='email' id='email' name='email' onChange={handleChange} required/>
                </div>
                <div className={`${classes.inputContainer}`}>
                    <p>Password</p>
                    <input type='password' id='password' name='password' onChange={handleChange} required/>
                </div>
                <button className={`${classes.submitButton}`} type='submit'>Log In</button>
                <p>No Account? <Link to='/register'>Create one.</Link></p>
            </form>
        </div>
    );
}

export default SignInForm;