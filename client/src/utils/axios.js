import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'content-type': 'application/json',
  },
});

export default request;
