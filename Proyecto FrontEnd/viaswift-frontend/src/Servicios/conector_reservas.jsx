import axios from 'axios';

const conector_unidades = axios.create({
  baseURL: 'http://localhost:9100/api/viajes', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default conector_unidades;
