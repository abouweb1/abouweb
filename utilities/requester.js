import axios from 'axios';

const username = 'admin';
const password = 'admin@2021';
const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');


export default axios.create({
    baseURL : "https://abou-apis.herokuapp.com",
    headers: {'Authorization': `Basic ${token}`},
})