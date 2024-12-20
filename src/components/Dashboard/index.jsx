import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Dashboard.module.css";
import Navigation from "../Navigation";
import Hero from "../Hero";
import JobApplication from "../JobApplication";
import Modal from "../Modal/Modal";
import JobApplicationModal from "../JobApplicationModal";
import axios from "axios";
import getNewTokens from "../../Functions/GetNewTokens";

function Dashboard() {
    const [jobApplications, setJobApplications] = useState([]);
    const [formData, setFormData] = useState({
        job_title: '',
        company: '',
        job_location: '',
        application_status: '',
    });
    const navigate = useNavigate();
    const dialogRef = useRef(null);
    const jobApplicationRef = useRef(null);

    const fetchJobApplications = async () => {
        try {
            if(localStorage.getItem('accessToken')){// Ensuring that the access token was stored in local storage before using it
                const accessToken = localStorage.getItem('accessToken');

                const response = await axios.get('http://localhost:8000/api/jobs/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                const listItems = response.data.map((jobApplication) => {
                    return {
                        id: jobApplication['id'],
                        content: <li key={jobApplication['id']}>
                                    <JobApplication 
                                        application={jobApplication}
                                        jobApplications={jobApplications}
                                        setJobApplications={setJobApplications}
                                        id={jobApplication['id']}
                                        timedOutDialog={dialogRef}
                                    />
                                 </li>
                    };
                });
                
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

    const createJobApplication = async () => {
        try {
            console.log(jobApplications);
            const accessToken = localStorage.getItem('accessToken');

            const response = await axios.post('http://localhost:8000/api/jobs/', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const returnedJobApplication = {
                id: response.data['id'],
                content: <li key={response.data['id']}>
                            <JobApplication 
                                application={response.data}
                                jobApplications={jobApplications}
                                setJobApplications={setJobApplications}
                                id={response.data['id']}
                                timedOutDialog={dialogRef}
                            />
                         </li>
            };

            setJobApplications([...jobApplications, returnedJobApplication]);

            jobApplicationRef.current.close();
        } catch (error) {
            if(error.response){
                if(error.response.status === 400){
                    jobApplicationRef.current.close();
                }else if(error.response.status === 401){
                    const updatedTokens = await getNewTokens();
    
                    if(updatedTokens) {
                        createJobApplication();
                    }else {
                        jobApplicationRef.current.close();
                        dialogRef.current.showModal();
                    }
                }
            }else {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        fetchJobApplications();
    }, []); // Empty dependency array ensures this only runs after initial render

    return (
        <div className={`${classes.dashboard}`}>
            <Modal 
                ref={dialogRef}
                message='Your session has expired. You will be redirected to the login page to start a new session.'
            />
            <JobApplicationModal
                ref={jobApplicationRef}
                formData={formData}
                setFormData={setFormData} 
                createJobApplication={createJobApplication}
            />
            <Navigation />
            <Hero 
                jobApplicationRef={jobApplicationRef}
            />
            {jobApplications.length > 0 && <ul className={`${classes.jobApplicationList}`}>{jobApplications.map((application) => application.content)}</ul>}
        </div>
    );
}

export default Dashboard;