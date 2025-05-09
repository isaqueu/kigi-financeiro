import axios from 'axios';

// Defina a URL base do seu webservice
// const BASE_URL = process.env.REACT_APP_API_URL || 'http://192.168.0.5:3000/api';
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3005/api';

// Crie uma instância do Axios com configurações padrão
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;