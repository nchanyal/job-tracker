import classes from './Navigation.module.css';
import Icon from '@mdi/react';
import { mdiBriefcase, mdiHome, mdiAccount } from '@mdi/js';

function Navigation() {
    const iconSize = 1.7;

    return (
        <nav className={`${classes.appNavigation}`}>
            <div>
                <Icon path={mdiBriefcase} size={iconSize} />
                <p className={`${classes.logo}`}>Job Tracker</p>
            </div>
            <div>
                <button className={`${classes.dashboard}`} type='button'>
                    <Icon path={mdiHome} size={iconSize} />
                    <p>Dashboard</p>
                </button>
                <button className={`${classes.account}`} type='button'>
                    <Icon path={mdiAccount} size={iconSize} />
                    <p>Account</p>
                </button>
            </div>
        </nav>
    );
}

export default Navigation;