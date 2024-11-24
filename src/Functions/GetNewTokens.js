import axios from "axios";
import storeTokens from "./StoreTokens";

const getNewTokens = async () => {
    const refreshToken = {
        refresh: `${localStorage.getItem('refreshToken')}`
    };

    try {
        const response = await axios.post('http://localhost:8000/api/token/refresh/', refreshToken);
        storeTokens(response.data);
        return true;
    } catch (error) {
        if(error.response.status === 401) {
            return false;
        }
    }
};

export default getNewTokens;