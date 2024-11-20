import { useEffect } from "react";
import classes from "./Dashboard.module.css";
import Navigation from "../Navigation";
import Hero from "../Hero";
import JobApplication from "../JobApplication";

function Dashboard() {
    return (
        <div className={`${classes.dashboard}`}>
            <Navigation />
            <Hero />
        </div>
    );
}

export default Dashboard;