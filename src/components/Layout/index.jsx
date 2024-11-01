import { Link } from "react-router-dom";

function Layout() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/login'>Log in</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Layout