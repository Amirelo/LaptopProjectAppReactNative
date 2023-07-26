import axios from 'axios';

const url = 'http://127.0.0.1:9999.thuctaptn/views';
export const axiosInstance = axios.create({baseURL: url});
