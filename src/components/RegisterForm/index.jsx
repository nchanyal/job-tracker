import classes from '../SignInForm/SignInForm.module.css';

function RegisterForm() {
    return (
        <div className={`${classes.formContainer}`}>
            <p className={`${classes.signUp}`}>Sign Up</p>
            <form action='#' method='post'>
                <div className={`${classes.inputContainer}`}>
                    <p>First Name</p>
                    <input type='text' id='firstName' name='first_name' maxLength={20} required/>
                </div>
                <div className={`${classes.inputContainer}`}>
                    <p>Last Name</p>
                    <input type='text' id='lastName' name='last_name' maxLength={20} required/>
                </div>
                <div className={`${classes.inputContainer}`}>
                    <p>Email</p>
                    <input type='email' id='email' name='user_email' required/>
                </div>
                <div className={`${classes.inputContainer}`}>
                    <p>Password</p>
                    <input type='password' id='password' name='user_password' maxLength={128} minLength={5} required/>
                </div>
                <button className={`${classes.submitButton}`} type='submit'>Create Account</button>
                <p>Or log in.</p>
            </form>
        </div>
    );
}

export default RegisterForm;