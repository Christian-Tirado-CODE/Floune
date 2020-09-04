import axios from 'axios';

const instance = axios.create({
baseURL:'https://react-ecommerce-fffba.firebaseio.com/'
});

export default instance;