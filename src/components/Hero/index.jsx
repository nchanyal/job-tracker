import classes from "./Hero.module.css";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

function Hero() {
    return (
        <div className={`${classes.hero}`}>
            <h1>Dashboard</h1>
            <div className={`${classes.heroNavigation}`}>
                <button>Applications</button>
                <button>Interviews</button>
                <button>
                    <Icon path={mdiPlus} size={1}>+</Icon>
                    <p>Add Application</p>
                </button>
            </div>
        </div>
    );
}

export default Hero;