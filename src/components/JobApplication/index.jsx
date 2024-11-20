import classes from "./JobApplication.module.css";
import Icon from "@mdi/react";
import { mdiOfficeBuilding, mdiMapMarker } from '@mdi/js';

function JobApplication({ application }) {
    return (
        <div className={`${classes.jobApplication}`}>
            <div className={`${classes.leftContainer}`}>
                <p className={`${classes.jobApplicationTitle}`}>
                    {application.job_title}
                </p>
                <div>
                    <Icon path={mdiOfficeBuilding} size={1} />
                    <p>{application.company}</p>
                    <Icon path={mdiMapMarker} size={1} />
                    <p>{application.job_location}</p>
                </div>
            </div>
            <div className={`${classes.wrapper}`}>
                <div className={`${classes.rightContainer}`}>
                    <p>{application.application_status}</p>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default JobApplication;