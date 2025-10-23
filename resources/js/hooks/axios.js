import axios from 'axios';

const token = sessionStorage.getItem('ffpi_toekn');

// Enable credentials for CSRF and sessions
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://ffpi-ss.org';

// Set Authorization header if token exists
if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// Fetch CSRF token before making API calls
export const setupAxios = async () => {
    try {
        await axios.get('/sanctum/csrf-cookie');
    } catch (error) {
        console.warn('CSRF cookie setup failed, continuing with token-only auth:', error.message);
    }
};

// Function to set token after login
export const setAuthToken = (token) => {
    if (token) {
        sessionStorage.setItem('ffpi_toekn', token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        sessionStorage.removeItem('ffpi_toekn');
        delete axios.defaults.headers.common.Authorization;
    }
};

export default axios;
