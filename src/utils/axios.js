import axios from 'axios';

const url = 'http://192.168.1.64:9000/thuctaptn/views';
export const axiosInstance = axios.create({baseURL: url});
