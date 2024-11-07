import classes from './SignInForm.module.css';
import axios from 'axios';
import storeTokens from '../../Functions/StoreTokens';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignInForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((previousFormData) => ({
            ...previousFormData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Prevents the user from spamming the submit button and sending multiple requests to the server
        if(isLoading) return;

        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:8000/api/login/', formData);
            storeTokens(response.data);
            navigate('/dashboard');
        }catch(error) {
            Object.keys(error.response.data).forEach((key) => {
                setErrorMessage(error.response.data[key]);
            });
        }finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={`${classes.formContainer}`}>
            <p className={`${classes.signIn}`}>Sign in</p>
            {errorMessage !== '' && <p style={{color:'red'}}>{errorMessage}</p>}
            <form action='#' method='post' onSubmit={handleSubmit}>
                <div className={`${classes.inputContainer}`}>
                    <p>Email</p>
                    <input type='email' id='email' name='email' onChange={handleChange} required/>
                </div>
                <div className={`${classes.inputContainer}`}>
                    <p>Password</p>
                    <input type='password' id='password' name='password' onChange={handleChange} required/>
                </div>
                <button className={`${classes.submitButton}`} type='submit' disabled={isLoading}>Log In</button>
                <p>No Account? <Link to='/register'>Create one.</Link></p>
            </form>
        </div>
    );
}

export default SignInForm;