import axios from 'axios';

const baseURL = 'http://192.168.1.83:5023';

const userApi = axios.create({
    baseURL, 
    headers: {
        "Content-Type": "application/json",
      },
});

export default userApi;