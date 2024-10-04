function SignInForm() {
    return (
        <div className='formContainer'>
            <p>Sign in</p>
            <form action="#" method="get">
                <div className="inputContainer">
                    <p>Email</p>
                    <input type="text" id="email" name="user_email"/>
                </div>
                <div className="inputContainer">
                    <p>Password</p>
                    <input type="text" id="password" name="user_password"/>
                </div>
                <button type="submit">Log In</button>
                <p>No Account? Create one.</p>
            </form>
        </div>
    );
}

export default SignInForm;