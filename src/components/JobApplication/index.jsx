import classes from "./JobApplication.module.css";
import Icon from "@mdi/react";
import { mdiOfficeBuilding, mdiMapMarker } from '@mdi/js';
import axios from "axios";
import getNewTokens from "../../Functions/GetNewTokens";

function JobApplication({ application, jobApplications, setJobApplications, id, timedOutDialog }) {
    const handleDelete = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.delete(`http://localhost:8000/api/jobs/${id}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setJobApplications((prevApplications) => prevApplications.filter((jobApplication) => jobApplication.id !== id));
        } catch (error) {
            if(error.response.status === 401){
                const updatedTokens = await getNewTokens();
                if(updatedTokens) {
                    handleDelete();
                }else {
                    timedOutDialog.current.showModal();
                }
            }
        }
    };

    return (
        <div className={`${classes.jobApplication}`}>
            <div className={`${classes.leftContainer}`}>
                <p className={`${classes.jobApplicationTitle}`}>
                    {application['job_title']}
                </p>
                <div>
                    <Icon path={mdiOfficeBuilding} size={1} />
                    <p>{application['company']}</p>
                    <Icon path={mdiMapMarker} size={1} />
                    <p>{application['job_location']}</p>
                </div>
            </div>
            <div className={`${classes.wrapper}`}>
                <div className={`${classes.rightContainer}`}>
                    <p>{application['application_status']}</p>
                    <button>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default JobApplication;