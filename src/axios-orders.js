import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-e9e02.firebaseio.com/'
})

export default instance;