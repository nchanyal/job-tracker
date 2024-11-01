import classes from './SignInForm.module.css';
import { Link } from 'react-router-dom';

function SignInForm() {
    return (
        <div className={`${classes.formContainer}`}>
            <p className={`${classes.signIn}`}>Sign in</p>
            <form action='#' method='post'>
                <div className={`${classes.inputContainer}`}>
                    <p>Email</p>
                    <input type='email' id='email' name='user_email' required/>
                </div>
                <div className={`${classes.inputContainer}`}>
                    <p>Password</p>
                    <input type='password' id='password' name='user_password' required/>
                </div>
                <button className={`${classes.submitButton}`} type='submit'>Log In</button>
                <p>No Account? <Link to='/register'>Create one.</Link></p>
            </form>
        </div>
    );
}

export default SignInForm;