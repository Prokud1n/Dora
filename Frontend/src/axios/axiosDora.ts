import axios from 'axios';

export default axios.create({
    baseURL: 'https://dora.team',
    headers: {
        'Content-Type': 'application/json',
        Pragma: 'no-cahce',
        'Cache-Control': 'no-cache',
        Accept: '*/*'
    }
});
