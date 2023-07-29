import axios from 'axios';

const url = 'http://172.16.2.5:9000/thuctaptn/views';
export const axiosInstance = axios.create({baseURL: url});
