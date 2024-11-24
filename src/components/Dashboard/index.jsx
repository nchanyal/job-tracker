import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Dashboard.module.css";
import Navigation from "../Navigation";
import Hero from "../Hero";
import JobApplication from "../JobApplication";
import Modal from "../Modal/Modal";
import axios from "axios";
import getNewTokens from "../../Functions/GetNewTokens";

function Dashboard() {
    const [jobApplications, setJobApplications] = useState([]);
    const navigate = useNavigate();
    const dialogRef = useRef(null);

    useEffect(() => {
        const fetchJobApplications = async () => {
            try {
                if(localStorage.getItem('accessToken')){// Ensuring that the access token was stored in local storage before using it
                    const accessToken = localStorage.getItem('accessToken');

                    const response = await axios.get('http://localhost:8000/api/jobs/', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });

                    const listItems = response.data.map((jobApplication) => 
                        <li key={jobApplication['id']}>
                            <JobApplication application={jobApplication}/>
                        </li>
                    );

                    setJobApplications([...listItems]);
                }else {
                    navigate('/login');
                }
            } catch (error) {
                if(error.response.status === 401){
                    const updatedTokens = await getNewTokens();
                    if(updatedTokens) {
                        fetchJobApplications();
                    }else {
                        dialogRef.current.showModal();
                    }
                }
            }
        };

        fetchJobApplications();
    }, []); // Empty dependency array ensures this only runs after initial render

    return (
        <div className={`${classes.dashboard}`}>
            <Modal 
                ref={dialogRef}
                message='Your session has expired. You will be redirected to the login page to start a new session.'
            />
            <Navigation />
            <Hero />
            {jobApplications.length > 0 && <ul className={`${classes.jobApplicationList}`}>{jobApplications}</ul>}
        </div>
    );
}

export default Dashboard;