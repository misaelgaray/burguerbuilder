import axios from 'axios';

const instance = axios.create({
  baseURL: "https://burguer-builder-81835.firebaseio.com/"
});

export default instance;