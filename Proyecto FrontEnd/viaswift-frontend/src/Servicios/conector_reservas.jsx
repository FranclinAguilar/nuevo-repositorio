import axios from 'axios';

const conector_reservas = axios.create({
  baseURL: 'http://localhost:9100/api/viajes', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default conector_reservas;
