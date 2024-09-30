import axios from 'axios';

const conector = axios.create({
  baseURL: 'http://localhost:8090/usuarios', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default conector;
