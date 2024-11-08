import axios from 'axios';
import classes from '../SignInForm/SignInForm.module.css';
import storeTokens from '../../Functions/StoreTokens';
import { useState } from 'react';
import { Link, useActionData, useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const [errorMessages, setErrorMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
        setErrorMessages([]);

        try {
            const response = await axios.post('http://localhost:8000/api/register/', formData);
            storeTokens(response.data);
            navigate('/dashboard');
        }catch(error) {
            const messages = [];

            Object.keys(error.response.data).forEach((key) => {
                messages.push(error.response.data[key]);
            });

            setErrorMessages([messages]);
        }finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={`${classes.formContainer}`}>
            <p className={`${classes.signUp}`}>Sign Up</p>
            {errorMessages.length > 0 && <p style={{color:'red'}}>{errorMessages}</p>}
            <form action='#' method='post' onSubmit={handleSubmit}>
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
                <button className={`${classes.submitButton}`} type='submit' disabled={isLoading}>Create Account</button>
                <p>Or <Link to='/login'>log in</Link>.</p>
            </form>
        </div>
    );
}

export default RegisterForm;