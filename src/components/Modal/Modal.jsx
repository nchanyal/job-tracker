import Icon from "@mdi/react";
import classes from "./Modal.module.css";
import { mdiCloseThick } from "@mdi/js";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const Modal = forwardRef(({ message }, ref) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        ref.current.close();
        navigate('/login');
    };
    
    return (
        <dialog ref={ref}>
            <div className={`${classes.top}`}>
                <h2>Notice</h2>
                <button onClick={handleButtonClick}>
                    <Icon path={mdiCloseThick} size={1}/>
                </button>
            </div>
            <p>{message}</p>
        </dialog>
    );
});

export default Modal;