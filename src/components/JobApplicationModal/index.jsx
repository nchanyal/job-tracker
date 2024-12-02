import classes from "./JobApplicationModal.module.css";
import { forwardRef } from "react";

const JobApplicationModal = forwardRef(({ formData, setFormData, createJobApplication }, ref) => {

    const handleCancelButtonClick = () => {
        ref.current.close();
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((previousFormData) => ({
            ...previousFormData,
            [name]: value,
        }));
    }

    return (
        <dialog ref={ref}>
            <form className={`${classes.application}`}>
                <div>
                    <label htmlFor="job_title">Position Title</label>
                    <input type="text" name="job_title" id="job_title" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="company">Company</label>
                    <input type="text" name="company" id="company" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="job_location">Location</label>
                    <input type="text" name="job_location" id="job_location" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="application_status">Status</label>
                    <input type="text" name="application_status" id="application_status" onChange={handleChange}/>
                </div>
                <div>
                    <button type="button" onClick={handleCancelButtonClick}>Cancel</button>
                    <button type="button" onClick={createJobApplication}>Submit</button>
                </div>
            </form>
        </dialog>
    );
});

export default JobApplicationModal;