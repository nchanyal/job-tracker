import classes from "./Hero.module.css";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

function Hero({ jobApplicationRef }) {

    const handleAddApplicationButton = () => {
        jobApplicationRef.current.showModal();
    };

    return (
        <>
            <div className={`${classes.hero}`}>
                <h1>Dashboard</h1>
                <div className={`${classes.heroNavigation}`}>
                    <button>Applications</button>
                    <button>Interviews</button>
                    <button onClick={handleAddApplicationButton}>
                        <Icon path={mdiPlus} size={1}>+</Icon>
                        <p>Add Application</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Hero;