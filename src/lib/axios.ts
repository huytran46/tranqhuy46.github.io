import axios from 'axios';

const BASE_URL = 'https://api.chucknorris.io';

const AxiosService = axios.create({
  baseURL: BASE_URL,
});

export default AxiosService;
