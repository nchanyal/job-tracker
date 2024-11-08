import classes from "./Dashboard.module.css";
import Navigation from "../Navigation";

function Dashboard() {
    return (
        <div className={`${classes.dashboard}`}>
            <Navigation />
        </div>
    );
}

export default Dashboard;