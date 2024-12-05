import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/orders', // Update with your server's base URL
    // baseURL: 'http://localhost:5000', // Update with your server's base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
