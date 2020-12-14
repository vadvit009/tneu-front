import axios from 'axios';

export const _axios = axios.create({
  baseURL:
    'http://localhost/api/v1'
    // 'https://zunu.herokuapp.com/api/v1'
})
